'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface HeartButtonProps {
  onClick: () => void
  children: React.ReactNode
  disabled?: boolean
}

const HeartButton: React.FC<HeartButtonProps> = ({ onClick, children, disabled = false }) => {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className="
        relative px-8 py-4 text-lg font-semibold text-white
        bg-gradient-to-r from-pink-400 to-purple-400
        hover:from-pink-500 hover:to-purple-500
        rounded-full shadow-lg shadow-pink-500/50
        hover:shadow-xl hover:shadow-pink-500/70
        transform transition-all duration-300
        hover:scale-105 active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed
        overflow-hidden group
      "
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Glow effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-300 to-purple-300 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-full" />

      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full">
        <div className="h-full w-1/3 bg-white/30 blur-sm animate-shimmer" />
      </div>

      {/* Button content */}
      <span className="relative z-10 flex items-center justify-center space-x-2">
        {children}
      </span>

      {/* Decorative hearts */}
      <motion.span
        className="absolute -top-2 -right-2 text-xs"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        💕
      </motion.span>
    </motion.button>
  )
}

export default HeartButton