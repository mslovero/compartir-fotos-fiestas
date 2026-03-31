'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function FloralDecoration() {
  return (
    <>
      {/* Esquina superior izquierda */}
      <motion.div
        initial={{ opacity: 0, x: -50, y: -50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="fixed top-0 left-0 w-[400px] h-[400px] pointer-events-none z-[1]"
        style={{
          mixBlendMode: 'multiply',
        }}
      >
        <Image
          src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&auto=format&fit=crop"
          alt="Flores decorativas"
          fill
          className="object-contain object-top-left"
          style={{ transform: 'scaleX(-1)' }}
          priority
        />
      </motion.div>

      {/* Esquina superior derecha */}
      <motion.div
        initial={{ opacity: 0, x: 50, y: -50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
        className="fixed top-0 right-0 w-[400px] h-[400px] pointer-events-none z-[1]"
        style={{
          mixBlendMode: 'multiply',
        }}
      >
        <Image
          src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&auto=format&fit=crop"
          alt="Flores decorativas"
          fill
          className="object-contain object-top-right"
          priority
        />
      </motion.div>

      {/* Esquina inferior izquierda */}
      <motion.div
        initial={{ opacity: 0, x: -50, y: 50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
        className="fixed bottom-0 left-0 w-[400px] h-[400px] pointer-events-none z-[1]"
        style={{
          mixBlendMode: 'multiply',
        }}
      >
        <Image
          src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&auto=format&fit=crop"
          alt="Flores decorativas"
          fill
          className="object-contain object-bottom-left"
          style={{ transform: 'rotate(180deg)' }}
          priority
        />
      </motion.div>

      {/* Esquina inferior derecha */}
      <motion.div
        initial={{ opacity: 0, x: 50, y: 50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.6 }}
        className="fixed bottom-0 right-0 w-[400px] h-[400px] pointer-events-none z-[1]"
        style={{
          mixBlendMode: 'multiply',
        }}
      >
        <Image
          src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&auto=format&fit=crop"
          alt="Flores decorativas"
          fill
          className="object-contain object-bottom-right"
          style={{ transform: 'rotate(180deg) scaleX(-1)' }}
          priority
        />
      </motion.div>
    </>
  )
}
