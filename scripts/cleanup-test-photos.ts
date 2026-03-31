/**
 * Script para eliminar todas las fotos de prueba
 * Uso: npx tsx scripts/cleanup-test-photos.ts
 */

import { initializeApp } from 'firebase/app'
import { getFirestore, collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { v2 as cloudinary } from 'cloudinary'

// Configuración de Firebase
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

async function deleteTestPhotos() {
  console.log('🔍 Buscando fotos de prueba...\n')

  try {
    // Buscar todas las fotos marcadas como test
    const q = query(collection(db, 'photos'), where('isTest', '==', true))
    const querySnapshot = await getDocs(q)

    const totalPhotos = querySnapshot.size

    if (totalPhotos === 0) {
      console.log('✅ No se encontraron fotos de prueba para eliminar.')
      return
    }

    console.log(`📊 Se encontraron ${totalPhotos} fotos de prueba\n`)
    console.log('🗑️  Eliminando fotos...\n')

    let deletedCount = 0
    let errorCount = 0

    for (const docSnapshot of querySnapshot.docs) {
      const photoData = docSnapshot.data()
      const photoId = docSnapshot.id

      try {
        // Eliminar de Cloudinary
        if (photoData.cloudinaryId) {
          try {
            await cloudinary.uploader.destroy(photoData.cloudinaryId)
            console.log(`☁️  Eliminado de Cloudinary: ${photoData.cloudinaryId}`)
          } catch (cloudinaryError) {
            console.warn(`⚠️  No se pudo eliminar de Cloudinary: ${photoData.cloudinaryId}`)
          }
        }

        // Eliminar de Firestore
        await deleteDoc(doc(db, 'photos', photoId))
        deletedCount++
        console.log(`✅ Eliminado de Firestore: ${photoId} (${deletedCount}/${totalPhotos})`)

      } catch (error) {
        errorCount++
        console.error(`❌ Error eliminando foto ${photoId}:`, error)
      }
    }

    console.log('\n' + '='.repeat(60))
    console.log('📊 RESUMEN:')
    console.log(`   ✅ Fotos eliminadas: ${deletedCount}`)
    console.log(`   ❌ Errores: ${errorCount}`)
    console.log('='.repeat(60))

  } catch (error) {
    console.error('❌ Error en la limpieza:', error)
    throw error
  }
}

async function deleteAllTestPhotosFromCloudinary() {
  console.log('\n🧹 Limpiando carpeta de pruebas en Cloudinary...\n')

  try {
    // Eliminar toda la carpeta de test en Cloudinary
    const result = await cloudinary.api.delete_resources_by_prefix(
      'fiesta-15-photos/test',
      { resource_type: 'image' }
    )

    console.log(`☁️  Eliminados ${Object.keys(result.deleted || {}).length} archivos de Cloudinary`)

    // Eliminar la carpeta vacía
    try {
      await cloudinary.api.delete_folder('fiesta-15-photos/test')
      console.log('📁 Carpeta de test eliminada de Cloudinary')
    } catch (error) {
      // Ignorar si la carpeta no existe
    }

  } catch (error) {
    console.warn('⚠️  No se pudo limpiar la carpeta de Cloudinary (puede no existir)')
  }
}

async function main() {
  console.log('🚀 Iniciando limpieza de fotos de prueba...\n')

  // Confirmar antes de eliminar
  console.log('⚠️  ADVERTENCIA: Este script eliminará TODAS las fotos marcadas como "test"')
  console.log('   Presiona Ctrl+C en los próximos 3 segundos para cancelar...\n')

  await new Promise(resolve => setTimeout(resolve, 3000))

  // Eliminar de Firestore y Cloudinary
  await deleteTestPhotos()

  // Limpieza adicional de Cloudinary
  await deleteAllTestPhotosFromCloudinary()

  console.log('\n✨ ¡Limpieza completada!')
  process.exit(0)
}

main().catch((error) => {
  console.error('❌ Error fatal:', error)
  process.exit(1)
})
