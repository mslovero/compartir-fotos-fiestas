import { NextRequest, NextResponse } from 'next/server'
import cloudinary from '@/lib/cloudinary'
import { db } from '@/lib/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

export async function POST(request: NextRequest) {
  try {
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
    const uploadResponse = await cloudinary.uploader.upload(base64Image, {
      folder: 'fiesta-15-photos',
      transformation: [
        { width: 1200, height: 1200, crop: 'limit' },
        { quality: 'auto' },
        { fetch_format: 'auto' }
      ]
    })

    // Save to Firestore
    const photoData = {
      url: uploadResponse.secure_url,
      cloudinaryId: uploadResponse.public_id,
      timestamp: serverTimestamp(),
      width: uploadResponse.width,
      height: uploadResponse.height,
    }

    const docRef = await addDoc(collection(db, 'photos'), photoData)

    return NextResponse.json({
      success: true,
      photo: {
        id: docRef.id,
        url: uploadResponse.secure_url,
        timestamp: Date.now(),
      }
    })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload photo' },
      { status: 500 }
    )
  }
}
