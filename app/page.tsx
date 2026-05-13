"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PhotoCounter from "@/components/PhotoCounter";
import { db } from "@/lib/firebase";
import { compressImage } from "@/lib/compress-image";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";

interface Photo {
  id: string;
  url: string;
  timestamp: number;
}

export default function Home() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [displayedPhotos, setDisplayedPhotos] = useState<Photo[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [source, setSource] = useState<"camera" | "gallery" | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const observerTarget = useRef<HTMLDivElement>(null);
  const PHOTOS_PER_LOAD = 12;

  // Real-time sync with Firestore
  useEffect(() => {
    const q = query(collection(db, "photos"), orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const photosData: Photo[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        // Use timestamp if exists, fallback to createdAt (ISO string) or current time
        let photoTime = Date.now();
        if (data.timestamp) {
          photoTime = data.timestamp.toMillis?.() || data.timestamp;
        } else if (data.createdAt) {
          photoTime = new Date(data.createdAt).getTime();
        }

        photosData.push({
          id: doc.id,
          url: data.url,
          timestamp: photoTime,
        });
      });
      setPhotos(photosData);
      // Initialize with first batch
      setDisplayedPhotos(photosData.slice(0, PHOTOS_PER_LOAD));
      setHasMore(photosData.length > PHOTOS_PER_LOAD);
    });

    return () => unsubscribe();
  }, []);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
          loadMorePhotos();
        }
      },
      { threshold: 0.1 },
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, isLoadingMore, displayedPhotos.length]);

  const handleImageLoad = (id: string) => {
    setLoadedImages((prev) => new Set(prev).add(id));
  };

  const loadMorePhotos = () => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);

    setTimeout(() => {
      const currentLength = displayedPhotos.length;
      const nextPhotos = photos.slice(
        currentLength,
        currentLength + PHOTOS_PER_LOAD,
      );

      setDisplayedPhotos((prev) => [...prev, ...nextPhotos]);
      setHasMore(currentLength + PHOTOS_PER_LOAD < photos.length);
      setIsLoadingMore(false);
    }, 500);
  };

  const processFile = (file: File, sourceType: "camera" | "gallery") => {
    if (file.type.startsWith("image/")) {
      setSource(sourceType);
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file, "camera");
  };

  const handleGallerySelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file, "gallery");
  };

  const handleUpload = async () => {
    if (!selectedFile || !previewUrl) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      setUploadProgress(10)

      const compressed = await compressImage(selectedFile)
      setUploadProgress(40)

      const formData = new FormData();
      formData.append("file", compressed, "photo.jpg");
      formData.append("source", source ?? "unknown");

      setUploadProgress(50);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      setUploadProgress(90);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error + (data.detail ? `: ${data.detail}` : ""));
      }

      setUploadProgress(100);

      // Reset form
      setPreviewUrl(null);
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      // Show success message briefly
      setTimeout(() => {
        setUploadProgress(0);
      }, 1000);
    } catch (error) {
      console.error("Error uploading photo:", error);
      alert(
        "Error al subir la foto:\n" +
          (error instanceof Error ? error.message : String(error)),
      );
    } finally {
      setIsUploading(false);
    }
  };

  const cancelUpload = () => {
    setPreviewUrl(null);
    setSelectedFile(null);
    setSource(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const deletePhoto = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta foto?')) return

    try {
      await deleteDoc(doc(db, 'photos', id))
    } catch (error) {
      console.error('Error deleting photo:', error)
      alert('Error al eliminar la foto.')
    }
  }

  const downloadPhoto = async (url: string, index: number) => {
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const blobUrl = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = blobUrl
      a.download = `fiesta-15-${index + 1}.jpg`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(blobUrl)
    } catch (error) {
      console.error('Error downloading photo:', error)
    }
  }

  return (
    <div className="min-h-screen p-4 md:p-8 relative">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 relative z-10"
      >
        <div className="mb-2">
          <p className="font-montserrat text-sm md:text-base tracking-[0.3em] text-purple-accent-600 uppercase mb-2">
            MIS
          </p>
          <p className="font-montserrat text-2xl md:text-3xl tracking-[0.2em] text-purple-accent-600 uppercase mb-4">
            XV
          </p>
        </div>
        <h1 className="font-greatvibes text-7xl md:text-9xl text-purple-accent-600 mb-4">
          Lola
        </h1>
        <div className="text-purple-accent-500 text-3xl mb-4">♥</div>
        <p className="font-opensans text-dusty-rose-600 text-lg md:text-xl font-light">
          Captura y comparte los momentos más especiales
        </p>
      </motion.div>

      {/* Upload Section */}
      <div className="max-w-2xl mx-auto mb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-effect rounded-3xl p-8"
        >
          <h2 className="text-2xl font-montserrat font-bold text-purple-accent-600 mb-6 text-center">
            Sube tu foto
          </h2>

          {!previewUrl ? (
            <div className="space-y-4">
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleCameraCapture}
                className="hidden"
              />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleGallerySelect}
                className="hidden"
              />
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => cameraInputRef.current?.click()}
                className="w-full bg-gradient-to-br from-purple-accent-500 to-purple-accent-600 rounded-2xl p-8 text-center cursor-pointer shadow-xl hover:shadow-2xl transition-all"
              >
                <svg
                  className="w-16 h-16 mx-auto mb-3 text-white/90"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <p className="font-montserrat text-white text-xl font-bold">
                  Sacar foto
                </p>
                <p className="font-opensans text-purple-accent-200 text-sm mt-1">
                  Usa la cámara para capturar el momento
                </p>
              </motion.button>

              <div className="text-center">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="font-opensans text-dusty-rose-500 hover:text-dusty-rose-600 transition-colors text-sm underline underline-offset-4 decoration-dashed decoration-dusty-rose-300 hover:decoration-dusty-rose-500"
                >
                  o elegir de la galería →
                </button>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <div className="relative rounded-2xl overflow-hidden bg-black aspect-square">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-contain"
                />
              </div>

              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${uploadProgress}%` }}
                    className="bg-purple-accent-500 h-2 rounded-full"
                  />
                </div>
              )}

              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={cancelUpload}
                  disabled={isUploading}
                  className="flex-1 py-4 bg-gray-300 text-gray-700 rounded-lg font-montserrat font-semibold hover:bg-gray-400 transition-all disabled:opacity-50"
                >
                  Cancelar
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleUpload}
                  disabled={isUploading}
                  className="flex-1 py-4 bg-gradient-to-r from-purple-accent-500 to-purple-accent-600 text-white rounded-lg font-montserrat font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 relative overflow-hidden"
                >
                  {isUploading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Subiendo...
                    </span>
                  ) : (
                    "Subir Foto"
                  )}
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Gallery */}
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <h2 className="text-3xl font-montserrat font-bold text-purple-accent-600">
            Galería de Recuerdos
          </h2>
          <PhotoCounter count={photos.length} />
        </div>

        {photos.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="font-opensans text-dusty-rose-500 text-xl">
              Aún no hay fotos. ¡Sé el primero en compartir un momento especial!
            </p>
          </motion.div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {displayedPhotos.map((photo, index) => (
                  <motion.div
                    key={photo.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: Math.min(index * 0.05, 0.3) }}
                    className="group relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all bg-purple-accent-100"
                  >
                    {!loadedImages.has(photo.id) && (
                      <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-purple-accent-100 via-purple-accent-200 to-purple-accent-100" />
                    )}
                    <img
                      src={photo.url}
                      alt={`Foto ${index + 1}`}
                      className={`w-full h-full object-cover transition-opacity duration-500 ${loadedImages.has(photo.id) ? "opacity-100" : "opacity-0"}`}
                      loading="lazy"
                      onLoad={() => handleImageLoad(photo.id)}
                    />

                    {/* Overlay con botón de eliminar */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute top-4 right-4 flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => downloadPhoto(photo.url, index)}
                          className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full shadow-lg hover:bg-white/40 transition-all"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                        </motion.button>
                      </div>

                      <div className="absolute bottom-4 left-4 text-white">
                        <p className="text-sm">
                          {new Date(photo.timestamp).toLocaleString("es-ES", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Loading indicator & Observer target */}
            {hasMore && (
              <div ref={observerTarget} className="flex justify-center py-12">
                {isLoadingMore && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-3 text-purple-accent-500"
                  >
                    <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span className="text-sm font-montserrat font-medium">
                      Cargando más fotos...
                    </span>
                  </motion.div>
                )}
              </div>
            )}

            {/* End message */}
            {!hasMore && displayedPhotos.length > PHOTOS_PER_LOAD && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8"
              >
                <p className="font-opensans text-dusty-rose-500 text-sm">
                  Has visto todas las {photos.length} fotos
                </p>
              </motion.div>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center mt-20 pb-8"
      >
        <p className="font-opensans text-dusty-rose-500 text-sm">
          Creado con amor para Loli, te queremos con todo nuestro corazón ♥
        </p>
      </motion.div>
    </div>
  );
}
