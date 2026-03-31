/**
 * Script para subir fotos de prueba usando placeholder images
 * Uso: npx tsx scripts/upload-test-photos.ts [cantidad]
 */

import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore'
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

// Colores variados para las imágenes de prueba
const colors = [
  'FF6B9D', // Rosa
  'C44569', // Rosa oscuro
  'FFC1CC', // Rosa claro
  'FFB6C1', // Rosa pastel
  'E91E63', // Magenta
  '9C27B0', // Púrpura
  'CE93D8', // Lavanda
  'BA68C8', // Orquídea
]

async function generateTestImage(index: number): Promise<string> {
  const color = colors[index % colors.length]
  const width = 800
  const height = 800

  // Usamos Picsum Photos para imágenes reales aleatorias
  const imageUrl = `https://picsum.photos/seed/${index}/${width}/${height}`

  try {
    // Descargamos la imagen y la subimos a Cloudinary
    const response = await fetch(imageUrl)
    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const base64Image = `data:image/jpeg;base64,${buffer.toString('base64')}`

    return base64Image
  } catch (error) {
    // Fallback: usar placeholder con color
    return `https://via.placeholder.com/${width}x${height}/${color}/FFFFFF?text=Test+${index + 1}`
  }
}

async function uploadTestPhoto(index: number, total: number): Promise<void> {
  try {
    console.log(`📸 Subiendo foto ${index + 1}/${total}...`)

    // Generar imagen de prueba
    const imageData = await generateTestImage(index)

    // Subir a Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(imageData, {
      folder: 'fiesta-15-photos/test',
      transformation: [
        { width: 1200, height: 1200, crop: 'limit' },
        { quality: 'auto' },
        { fetch_format: 'auto' }
      ],
      tags: ['test', 'auto-generated'] // Tag para identificar fotos de prueba
    })

    // Guardar en Firestore
    const photoData = {
      url: uploadResponse.secure_url,
      cloudinaryId: uploadResponse.public_id,
      timestamp: serverTimestamp(),
      width: uploadResponse.width,
      height: uploadResponse.height,
      isTest: true, // Marcador para identificar fotos de prueba
    }

    await addDoc(collection(db, 'photos'), photoData)

    console.log(`✅ Foto ${index + 1}/${total} subida exitosamente`)

  } catch (error) {
    console.error(`❌ Error subiendo foto ${index + 1}:`, error)
  }
}

async function main() {
  const args = process.argv.slice(2)
  const count = parseInt(args[0]) || 500

  console.log(`🚀 Iniciando carga de ${count} fotos de prueba...\n`)
  console.log(`⚠️  NOTA: Estas fotos se marcarán como "test" para facilitar su eliminación\n`)

  const batchSize = 10 // Subir 10 fotos en paralelo para mayor velocidad
  const batches = Math.ceil(count / batchSize)

  for (let batch = 0; batch < batches; batch++) {
    const startIndex = batch * batchSize
    const endIndex = Math.min(startIndex + batchSize, count)

    console.log(`\n📦 Procesando lote ${batch + 1}/${batches} (fotos ${startIndex + 1}-${endIndex})`)

    const promises = []
    for (let i = startIndex; i < endIndex; i++) {
      promises.push(uploadTestPhoto(i, count))
    }

    await Promise.all(promises)

    // Pequeña pausa entre lotes para no saturar la API
    if (batch < batches - 1) {
      console.log('\n⏸️  Pausa de 2 segundos...')
      await new Promise(resolve => setTimeout(resolve, 2000))
    }
  }

  console.log(`\n\n🎉 ¡Proceso completado! Se subieron ${count} fotos de prueba.`)
  console.log(`\n💡 Para eliminarlas, ejecuta: npx tsx scripts/cleanup-test-photos.ts`)

  process.exit(0)
}

main().catch((error) => {
  console.error('❌ Error fatal:', error)
  process.exit(1)
})
