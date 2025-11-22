'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface EnvelopeAnimationProps {
  onOpen: () => void
}

const EnvelopeAnimation: React.FC<EnvelopeAnimationProps> = ({ onOpen }) => {
  const [isOpen, setIsOpen] = useState(false)

  // Fixed animation values for sparkles to avoid Math.random in render
  const sparkleAnimations = [
    { x: -80, y: -60, rotate: 120 },
    { x: 60, y: -90, rotate: 240 },
    { x: -100, y: 40, rotate: 180 },
    { x: 80, y: 70, rotate: 300 },
    { x: -60, y: 100, rotate: 60 },
    { x: 100, y: -40, rotate: 360 },
  ]

  const handleEnvelopeClick = () => {
    if (!isOpen) {
      setIsOpen(true)
      setTimeout(() => {
        onOpen()
      }, 1200) // Wait for opening animation to complete
    }
  }

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

      {/* Message above envelope */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="absolute top-1/4 text-center"
      >
        <p className="text-lg md:text-xl text-gray-700 font-medium">
          A special message for you…
        </p>
        <div className="mt-2 text-2xl animate-twinkle">✨</div>
      </motion.div>

      {/* 3D Envelope Container */}
      <motion.div
        className="relative"
        style={{
          perspective: '1000px',
          transformStyle: 'preserve-3d'
        }}
        animate={{
          y: [0, -15, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={{
          y: -20,
          transition: { duration: 0.3 }
        }}
      >
        {/* Envelope Body */}
        <motion.div
          className="relative w-64 h-40 md:w-80 md:h-48 bg-gradient-to-br from-pink-200 to-purple-200 rounded-lg shadow-2xl shadow-purple-500/30 border-2 border-white/30 cursor-pointer transform-gpu"
          onClick={handleEnvelopeClick}
          whileHover={{
            scale: 1.05,
            boxShadow: '0 25px 50px -12px rgba(168, 85, 247, 0.5)'
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Envelope decoration lines */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-0.5 bg-white/40 absolute top-1/3" />
            <div className="w-full h-0.5 bg-white/40 absolute bottom-1/3" />
          </div>

          {/* Envelope flap */}
          <AnimatePresence>
            {!isOpen && (
              <motion.div
                initial={{ rotateX: 0 }}
                animate={{ rotateX: isOpen ? 180 : 0 }}
                exit={{ rotateX: 180 }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
                style={{
                  transformOrigin: 'top center',
                  transformStyle: 'preserve-3d'
                }}
                className="absolute -top-20 left-0 w-0 h-0"
              >
                {/* Triangle flap shape */}
                <svg
                  width="100%"
                  height="100"
                  viewBox="0 0 320 100"
                  className="drop-shadow-lg"
                  style={{
                    filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))'
                  }}
                >
                  <defs>
                    <linearGradient id="flapGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#F9A8D4" />
                      <stop offset="100%" stopColor="#C084FC" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 160 0 L 320 100 L 0 100 Z"
                    fill="url(#flapGradient)"
                    stroke="rgba(255, 255, 255, 0.3)"
                    strokeWidth="2"
                  />
                </svg>

                {/* Heart seal on flap */}
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    filter: ['drop-shadow(0 0 10px rgba(255, 182, 193, 0.5))', 'drop-shadow(0 0 20px rgba(255, 182, 193, 0.8))', 'drop-shadow(0 0 10px rgba(255, 182, 193, 0.5))']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  💖
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Opening animation sparkles */}
          <AnimatePresence>
            {isOpen && (
              <>
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-2xl"
                    style={{
                      top: '50%',
                      left: '50%',
                    }}
                    initial={{
                      scale: 0,
                      opacity: 1,
                      x: 0,
                      y: 0
                    }}
                    animate={{
                      scale: [0, 1.5, 0],
                      opacity: [1, 1, 0],
                      x: sparkleAnimations[i].x,
                      y: sparkleAnimations[i].y,
                      rotate: sparkleAnimations[i].rotate
                    }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 1.5,
                      delay: i * 0.1,
                      ease: "easeOut"
                    }}
                  >
                    {['✨', '💫', '⭐', '🌟', '💖', '💕'][i]}
                  </motion.div>
                ))}
              </>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Shadow */}
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-48 h-8 bg-black/20 rounded-full blur-xl" />
      </motion.div>

      {/* Instruction text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 0 : 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        className="absolute bottom-1/4 text-gray-600 text-sm md:text-base"
      >
        Click the envelope to open 💕
      </motion.p>
    </motion.div>
  )
}

export default EnvelopeAnimation