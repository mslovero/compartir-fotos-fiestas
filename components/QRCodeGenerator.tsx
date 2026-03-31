'use client'

import { useEffect, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'

export default function QRCodeGenerator() {
  const [url, setUrl] = useState('')

  useEffect(() => {
    setUrl(window.location.href)
  }, [])

  if (!url) return null

  return (
    <div className="bg-white p-6 rounded-2xl inline-block shadow-inner">
      <QRCodeSVG
        value={url}
        size={256}
        level="H"
        includeMargin={true}
        fgColor="#a06d9f"
        bgColor="#ffffff"
      />
    </div>
  )
}
