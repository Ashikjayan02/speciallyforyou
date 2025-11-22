'use client'

import React from 'react'
import { motion } from 'framer-motion'
import HeartButton from './HeartButton'

interface InitialPopupProps {
  onNext: () => void
}

const InitialPopup: React.FC<InitialPopupProps> = ({ onNext }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="fixed inset-0 flex items-center justify-center p-4 z-50"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

      {/* Popup Content */}
      <motion.div
        animate={{
              y: [0, -10, 0],
        }}
        transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
        }}
        className="relative glass-card rounded-3xl p-8 md:p-12 max-w-md w-full mx-auto shadow-2xl shadow-pink-500/20 ring-4 ring-pink-400/30 border border-white/30"
      >
        {/* Floating hearts decoration */}
        <div className="absolute -top-4 -left-4 text-2xl animate-float">
          💕
        </div>
        <div className="absolute -top-2 -right-2 text-xl animate-float" style={{ animationDelay: '0.5s' }}>
          ✨
        </div>
        <div className="absolute -bottom-2 -left-2 text-xl animate-float" style={{ animationDelay: '1s' }}>
          💖
        </div>
        <div className="absolute -bottom-4 -right-4 text-2xl animate-float" style={{ animationDelay: '1.5s' }}>
          💕
        </div>

        {/* Main Content */}
        <div className="relative text-center space-y-6">
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400"
          >
            Hey Princess! 💕
          </motion.h1>

          {/* Message */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-gray-700 text-base md:text-lg leading-relaxed space-y-2"
          >
            I wanted to do something special for you for this Princess Day, so I made something just for you...
            <br />
            <br />
            Click below to see what it is! ✨
          </motion.p>

          {/* Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="pt-4"
          >
            <HeartButton onClick={onNext}>
              Open My Heart 💖
            </HeartButton>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default InitialPopup

