'use client'

import { motion } from 'framer-motion'

interface PhotoCounterProps {
  count: number
}

export default function PhotoCounter({ count }: PhotoCounterProps) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="glass-effect rounded-2xl px-6 py-4 inline-flex items-center gap-3 shadow-lg"
    >
      <div className="w-12 h-12 bg-gradient-to-br from-purple-accent-500 to-purple-accent-600 rounded-full flex items-center justify-center">
        <motion.span
          key={count}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-white font-montserrat font-bold text-xl"
        >
          {count}
        </motion.span>
      </div>
      <div className="text-left">
        <p className="text-sm font-opensans text-dusty-rose-500 font-medium">Total de</p>
        <p className="text-lg font-montserrat font-bold text-purple-accent-600">
          {count === 1 ? 'Recuerdo' : 'Recuerdos'}
        </p>
      </div>
    </motion.div>
  )
}
