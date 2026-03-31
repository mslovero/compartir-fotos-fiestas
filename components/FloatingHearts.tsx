'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function FloatingHearts() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const flowers = Array.from({ length: 8 })
  const positions = flowers.map(() => ({
    x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
    y: typeof window !== 'undefined' ? window.innerHeight + 50 : 1000,
  }))

  // Flores decorativas con símbolos Unicode
  const flowerSymbols = ['✿', '❀', '✾', '❁', '❃', '✽', '❊', '❋']

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {flowers.map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-purple-accent-300/15 text-5xl"
          style={{
            filter: 'blur(0.5px)',
            textShadow: '0 2px 4px rgba(196, 161, 191, 0.1)'
          }}
          initial={{
            x: positions[i].x,
            y: positions[i].y,
            rotate: 0,
          }}
          animate={{
            y: -100,
            x: positions[i].x + (Math.random() - 0.5) * 150,
            rotate: 360,
          }}
          transition={{
            duration: 20 + Math.random() * 15,
            repeat: Infinity,
            ease: 'linear',
            delay: i * 2.5,
          }}
        >
          {flowerSymbols[i % flowerSymbols.length]}
        </motion.div>
      ))}

      {/* Flores decorativas fijas en esquinas */}
      <motion.div
        className="absolute top-8 left-8 text-purple-accent-300/20 text-7xl"
        initial={{ rotate: 0, opacity: 0 }}
        animate={{ rotate: 10, opacity: 1 }}
        transition={{ duration: 2 }}
      >
        ❀
      </motion.div>
      <motion.div
        className="absolute top-8 right-8 text-purple-accent-300/20 text-7xl"
        initial={{ rotate: 0, opacity: 0 }}
        animate={{ rotate: -10, opacity: 1 }}
        transition={{ duration: 2 }}
      >
        ✿
      </motion.div>
      <motion.div
        className="absolute bottom-20 left-12 text-dusty-rose-400/20 text-6xl"
        initial={{ rotate: 0, opacity: 0 }}
        animate={{ rotate: 15, opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      >
        ❁
      </motion.div>
      <motion.div
        className="absolute bottom-20 right-12 text-dusty-rose-400/20 text-6xl"
        initial={{ rotate: 0, opacity: 0 }}
        animate={{ rotate: -15, opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      >
        ❊
      </motion.div>
    </div>
  )
}
