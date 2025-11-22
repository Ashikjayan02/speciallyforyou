'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HeartButton from './HeartButton'

interface Page5SealedLetterPopupProps {
  onExperienceAgain: () => void
  onSendKiss: () => void
}

const Page5SealedLetterPopup: React.FC<Page5SealedLetterPopupProps> = ({
  onExperienceAgain,
  onSendKiss
}) => {
  // State management
  const [showHearts, setShowHearts] = useState<boolean>(false)
  const [currentDateTime, setCurrentDateTime] = useState<string>('')
  const [rating, setRating] = useState<number>(0)

  // Update date and time function
  const updateDateTime = (): void => {
    const now = new Date()
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }
    try {
      const formatted = now.toLocaleDateString('en-US', options)
      setCurrentDateTime(formatted)
    } catch (error) {
      const fallbackDate = now.toLocaleString()
      setCurrentDateTime(fallbackDate)
    }
  }

  // Effects
 useEffect(() => {
  // Delay state updates to the next event loop — Safe for React
  setTimeout(() => {
    setShowHearts(true)
    updateDateTime()
  }, 0)

  const interval = setInterval(updateDateTime, 1000)

  return () => clearInterval(interval)
}, [])
  // Heart positions
  const heartPositions = [
    { x: '10%', y: '20%' },
    { x: '20%', y: '40%' },
    { x: '80%', y: '30%' },
    { x: '75%', y: '60%' },
    { x: '15%', y: '70%' },
    { x: '85%', y: '80%' },
    { x: '50%', y: '10%' },
    { x: '30%', y: '85%' }
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 flex items-center justify-center p-4 z-50 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100"
    >
      {/* Floating hearts animation */}
      <AnimatePresence>
        {showHearts && (
          <>
            {heartPositions.map((pos, i) => (
              <motion.div
                key={i}
                initial={{
                  x: pos.x,
                  y: '120%',
                  opacity: 0,
                  scale: 0
                }}
                animate={{
                  y: pos.y,
                  opacity: [0, 1, 1, 0],
                  scale: [0, 1, 1, 0]
                }}
                transition={{
                  duration: 3 + (i % 2),
                  delay: i * 0.2,
                  repeat: Infinity,
                  repeatDelay: 2
                }}
                className="absolute text-4xl md:text-5xl"
                style={{
                  left: pos.x,
                  pointerEvents: 'none'
                }}
              >
                ❤️
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Modal Popup */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'backOut' }}
        className="relative glass-card rounded-3xl p-8 md:p-12 max-w-2xl w-full mx-auto shadow-2xl shadow-pink-500/50 ring-4 ring-pink-400/40 border border-white/40 backdrop-blur-xl"
      >
        {/* Content */}
        <div className="relative space-y-8 text-center">
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500"
          >
            💌 Letter Sealed with Love 💌
          </motion.h1>

          {/* Message */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl md:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400"
          >
            I Love You Always Bujukku 💕
          </motion.p>

          {/* Heart Rating System */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex justify-center gap-3 md:gap-4"
          >
            {[1, 2, 3, 4, 5].map((heart) => (
              <motion.button
                key={heart}
                onClick={() => setRating(heart)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="text-3xl md:text-4xl transition-all duration-300 cursor-pointer"
                style={{
                  filter: heart <= rating ? 'drop-shadow(0 0 10px rgba(236, 72, 153, 0.8))' : 'none',
                  opacity: heart <= rating ? 1 : 0.4
                }}
              >
                ❤️
              </motion.button>
            ))}
          </motion.div>

          {/* Date and Time */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-gray-700 text-base md:text-lg font-medium"
          >
            <p className="font-serif italic">{currentDateTime}</p>
          </motion.div>

          {/* Footer message */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400"
          >
            Always Yours 💕
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8"
          >
            <HeartButton onClick={onExperienceAgain}>
              Experience Again ✨
            </HeartButton>
            <motion.button
              onClick={onSendKiss}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-red-400 to-pink-400 hover:from-red-500 hover:to-pink-500 text-white rounded-full font-semibold text-lg shadow-lg shadow-red-500/50 hover:shadow-xl hover:shadow-red-500/70 transition-all"
            >
              Send a Virtual Kiss 💋
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Page5SealedLetterPopup