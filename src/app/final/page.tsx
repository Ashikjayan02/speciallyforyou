'use client'
import { motion } from 'framer-motion'
import BackgroundParticles from '@/components/BackgroundParticles'
import AudioToggle from '@/components/AudioToggle'
export default function FinalLetter() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Particles */}
      <BackgroundParticles />
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="bg-white/90 backdrop-blur-md rounded-3xl p-8 max-w-4xl mx-auto shadow-2xl border-2 border-pink-200"
        >
          <div className="text-center">
            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-8"
            >
              💌 My Dearest Princess 💌
            </motion.h1>
            <div className="space-y-6 mb-8">
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-lg md:text-xl text-gray-700 font-medium leading-relaxed"
              >
                From the moment you entered my life, everything changed...
                <br />
                You brought colors to my black and white world 🌈
              </motion.p>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="text-lg md:text-xl text-gray-700 font-medium leading-relaxed"
              >
                Your smile is my sunshine ☀️
                <br />
                Your laugh is my favorite melody 🎵
                <br />
                Your love is my greatest treasure 💎
              </motion.p>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="text-lg md:text-xl text-gray-700 font-medium leading-relaxed"
              >
                Every moment with you feels like a dream come true ✨
                <br />
                I promise to love you today, tomorrow, and forever 💕
              </motion.p>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.8 }}
                className="text-lg md:text-xl text-gray-700 font-medium leading-relaxed"
              >
                You are my princess, my queen, my everything 👑
                <br />
                I love you more than words can express 💖
              </motion.p>
            </div>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.8 }}
              className="flex justify-center space-x-4 mb-8"
            >
              <span className="text-4xl animate-pulse">💕</span>
              <span className="text-4xl animate-pulse" style={{ animationDelay: '0.5s' }}>💖</span>
              <span className="text-4xl animate-pulse" style={{ animationDelay: '1s' }}>💝</span>
              <span className="text-4xl animate-pulse" style={{ animationDelay: '1.5s' }}>💗</span>
            </motion.div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="text-lg md:text-xl text-purple-600 font-bold"
            >
              Forever yours, my love 💕
              <br />
              Your loving husband
            </motion.div>
          </div>
        </motion.div>
      </div>
      {/* Floating decorative elements */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute top-8 left-8 text-4xl opacity-30"
      >
        💖
      </motion.div>
      <motion.div
        animate={{ scale: [1, 1.1, 1], rotate: [0, -5, 5, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
        className="absolute top-8 right-8 text-4xl opacity-30"
      >
        💕
      </motion.div>
      <motion.div
        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        className="absolute bottom-8 left-8 text-4xl opacity-30"
      >
        ✨
      </motion.div>
      <motion.div
        animate={{ scale: [1, 1.1, 1], rotate: [0, -5, 5, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
        className="absolute bottom-8 right-8 text-4xl opacity-30"
      >
        🌟
      </motion.div>
      {/* Audio Toggle */}
      <AudioToggle />
      {/* Hidden h1 for accessibility */}
      <h1 className="sr-only">
        Final Love Letter - A Special Message for Princess
      </h1>
    </div>
  )
}