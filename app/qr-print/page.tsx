'use client'

import { useEffect, useState } from 'react'
import QRCodeGenerator from '@/components/QRCodeGenerator'

export default function QRPrintPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handlePrint = () => {
    window.print()
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-white">
      {/* Print styles */}
      <style jsx global>{`
        @media print {
          .no-print {
            display: none !important;
          }
          .print-page {
            page-break-after: always;
          }
        }
      `}</style>

      {/* Screen version - con botón de imprimir */}
      <div className="no-print p-8 bg-[#F5F3EE] min-h-screen">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={handlePrint}
            className="mb-6 px-8 py-3 bg-purple-accent-500 text-white rounded-lg shadow-lg hover:bg-purple-accent-600 transition-all font-montserrat font-medium"
          >
            🖨️ Imprimir QR Code
          </button>

          <div className="bg-white rounded-3xl shadow-2xl p-12">
            <div className="text-center">
              <div className="mb-4">
                <p className="font-montserrat text-sm tracking-[0.3em] text-purple-accent-600 uppercase mb-2">
                  MIS
                </p>
                <p className="font-montserrat text-2xl tracking-[0.2em] text-purple-accent-600 uppercase mb-4">
                  XV
                </p>
              </div>
              <h1 className="font-greatvibes text-7xl text-purple-accent-600 mb-4">
                Lola
              </h1>
              <div className="text-purple-accent-500 text-3xl mb-6">
                ♥
              </div>
              <p className="font-opensans text-dusty-rose-600 text-xl mb-8">
                Captura y comparte los momentos especiales
              </p>

              <div className="flex justify-center mb-6">
                <QRCodeGenerator />
              </div>

              <div className="mt-8 p-6 bg-purple-accent-50 rounded-2xl">
                <h2 className="text-2xl font-montserrat font-bold text-purple-accent-600 mb-3">
                  📸 Comparte tus Fotos
                </h2>
                <p className="font-opensans text-gray-700 mb-4">
                  Escanea el código QR con tu móvil para subir fotos de la fiesta
                </p>
                <div className="text-sm font-opensans text-gray-600 space-y-1">
                  <p>1. Escanea el código QR</p>
                  <p>2. Toma o selecciona una foto</p>
                  <p>3. ¡Compártela con todos!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Print version - optimizada para impresión */}
      <div className="hidden print:block print-page">
        <div className="flex flex-col items-center justify-center min-h-screen p-12">
          <div className="text-center mb-12">
            <p className="text-2xl tracking-[0.3em] text-purple-600 uppercase mb-2" style={{ fontFamily: 'sans-serif' }}>
              MIS
            </p>
            <p className="text-4xl tracking-[0.2em] text-purple-600 uppercase mb-6" style={{ fontFamily: 'sans-serif' }}>
              XV
            </p>
            <h1 className="text-9xl text-purple-600 mb-4" style={{ fontFamily: 'cursive' }}>
              Lola
            </h1>
            <div className="text-5xl text-purple-500 mb-8">
              ♥
            </div>
            <p className="text-3xl text-gray-700 mb-12" style={{ fontFamily: 'sans-serif' }}>
              Comparte tus fotos
            </p>
          </div>

          <div className="mb-12 border-8 border-gray-800 p-8 rounded-3xl">
            <QRCodeGenerator />
          </div>

          <div className="text-center max-w-2xl">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              📸 ¿Cómo subir tus fotos?
            </h2>

            <div className="space-y-4 text-left text-2xl text-gray-700">
              <div className="flex items-start gap-4">
                <span className="font-bold text-3xl text-gray-800">1.</span>
                <p>Abre la cámara de tu móvil y apunta al código QR</p>
              </div>
              <div className="flex items-start gap-4">
                <span className="font-bold text-3xl text-gray-800">2.</span>
                <p>Toca la notificación para abrir el sitio web</p>
              </div>
              <div className="flex items-start gap-4">
                <span className="font-bold text-3xl text-gray-800">3.</span>
                <p>Toma una foto o selecciona de tu galería</p>
              </div>
              <div className="flex items-start gap-4">
                <span className="font-bold text-3xl text-gray-800">4.</span>
                <p>¡Sube tu foto y compártela con todos!</p>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-xl text-gray-500">
              ¡Gracias por ser parte de este día especial!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
