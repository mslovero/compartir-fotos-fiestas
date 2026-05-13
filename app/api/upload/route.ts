import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'
import { db } from '@/lib/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

export async function POST(request: NextRequest) {
  try {
    // Configure Cloudinary inside the function
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME?.trim()
    const apiKey = process.env.CLOUDINARY_API_KEY?.trim()
    const apiSecret = process.env.CLOUDINARY_API_SECRET?.trim()

    if (!cloudName || !apiKey || !apiSecret) {
      console.error('Missing Cloudinary credentials')
      return NextResponse.json({ error: 'Server configuration error: missing Cloudinary credentials' }, { status: 500 })
    }

    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
    })

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64Image = `data:${file.type};base64,${buffer.toString('base64')}`

    // Upload to Cloudinary
    let uploadResponse
    try {
      uploadResponse = await cloudinary.uploader.upload(base64Image, {
        folder: 'fiesta-15-photos',
        transformation: [
          { width: 1200, height: 1200, crop: 'limit' },
          { quality: 'auto' },
          { fetch_format: 'auto' }
        ]
      })
    } catch (cloudErr) {
      console.error('Cloudinary upload error:', cloudErr)
      return NextResponse.json({ 
        error: 'Cloudinary upload failed', 
        detail: cloudErr instanceof Error ? cloudErr.message : String(cloudErr) 
      }, { status: 500 })
    }

    // Save to Firestore using Client SDK (now variables are clean)
    let docRef
    try {
      const photoData = {
        url: uploadResponse.secure_url,
        cloudinaryId: uploadResponse.public_id,
        timestamp: serverTimestamp(),
        width: uploadResponse.width,
        height: uploadResponse.height,
        createdAt: new Date().toISOString()
      }
      
      docRef = await addDoc(collection(db, 'photos'), photoData)
    } catch (firestoreErr) {
      console.error('Firestore error:', firestoreErr)
      return NextResponse.json({ 
        error: 'Failed to save photo metadata to Firestore', 
        detail: firestoreErr instanceof Error ? firestoreErr.message : String(firestoreErr) 
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      photo: {
        id: docRef.id,
        url: uploadResponse.secure_url,
        timestamp: Date.now(),
      }
    })

  } catch (error) {
    console.error('General upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload photo', detail: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}
