'use client'
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
const LoveLetter: React.FC = () => {
  const letterContent = `My Love ❤️,
Naan unai sandhithadhum vidhialeh! Naan unaku endru vaazhvadhum vidhialehh! Yenadi ivalo thamadham? Enanai undrodhu inika! Enmedhu vizhum un oru oru moochukatrum Enai melum melum en manadhai un mandhodhu inika thona veikumadi Thai thedum siru pillai pola annen adii!!! Vaazhvatharuku orey Karanam nee adi!!!
-Ipadiku ashiksadhana❤`
  // Fixed positions for background sparkles to avoid Math.random in render
  const backgroundSparkles = [
    { top: 15, left: 20 },
    { top: 30, left: 80 },
    { top: 45, left: 10 },
    { top: 60, left: 70 },
    { top: 25, left: 50 },
    { top: 75, left: 30 },
    { top: 85, left: 90 },
    { top: 55, left: 60 },
  ]
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center p-4 z-50 overflow-y-auto"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
      {/* Love Letter Container */}
      <motion.div
        initial={{ y: 100, opacity: 0, scale: 0.8 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{
          duration: 1.2,
          ease: 'easeOut',
          delay: 0.3
        }}
        className="relative w-full max-w-2xl mx-auto"
      >
        {/* Letter Paper */}
        <div
          className="
            relative bg-gradient-to-br from-yellow-50 to-pink-50
            rounded-2xl shadow-2xl shadow-pink-300/40
            border-4 border-double border-pink-200
            overflow-hidden
          "
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                45deg,
                transparent,
                transparent 10px,
                rgba(255, 182, 193, 0.03) 10px,
                rgba(255, 182, 193, 0.03) 20px
              )
            `
          }}
        >
          {/* Decorative heart border corners */}
          <div className="absolute top-2 left-2 text-2xl animate-float">💕</div>
          <div className="absolute top-2 right-2 text-2xl animate-float" style={{ animationDelay: '0.5s' }}>💖</div>
          <div className="absolute bottom-2 left-2 text-2xl animate-float" style={{ animationDelay: '1s' }}>💗</div>
          <div className="absolute bottom-2 right-2 text-2xl animate-float" style={{ animationDelay: '1.5s' }}>💝</div>
          {/* Paper fold lines */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-pink-200/30 to-transparent" />
          <div className="absolute top-1/3 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-pink-200/20 to-transparent" />
          <div className="absolute top-2/3 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-pink-200/20 to-transparent" />
          {/* Letter Content */}
          <div className="relative p-8 md:p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="
                text-gray-800 font-serif italic text-lg md:text-xl
                leading-relaxed space-y-4
                [text-shadow:_0_1px_2px_rgba(0,0,0,0.05)]
              "
              style={{
                fontFamily: 'Georgia, serif',
                letterSpacing: '0.02em'
              }}
            >
              {letterContent.split('\n').map((line, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.8 + (index * 0.1),
                    duration: 0.6
                  }}
                  className={line.trim() === '' ? 'h-4' : 'mb-4'}
                >
                  {line.trim() === '' ? '\u00A0' : line}
                </motion.p>
              ))}
            </motion.div>
            {/* Signature */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              className="mt-8 text-right"
            >
              <div className="text-2xl animate-pulse">
                Forever yours 💕
              </div>
            </motion.div>
          </div>
          {/* Sparkle effects around letter */}
          <AnimatePresence>
            {[
              { top: '10%', left: '5%', delay: 0 },
              { top: '15%', right: '8%', delay: 0.2 },
              { top: '45%', left: '3%', delay: 0.4 },
              { top: '60%', right: '5%', delay: 0.6 },
              { top: '85%', left: '8%', delay: 0.8 },
              { top: '90%', right: '10%', delay: 1 },
            ].map((position, i) => (
              <motion.div
                key={`sparkle-${i}`}
                className="absolute text-yellow-400 text-xl"
                style={{
                  ...position,
                }}
                initial={{ scale: 0, opacity: 0, rotate: 0 }}
                animate={{
                  scale: [0, 1.2, 1],
                  opacity: [0, 1, 0.8],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 2,
                  delay: 1 + position.delay,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeInOut"
                }}
              >
                ✨
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        {/* Letter shadow */}
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-3/4 h-8 bg-black/15 rounded-full blur-2xl" />
      </motion.div>
      {/* Floating sparkles in background */}
      <div className="absolute inset-0 pointer-events-none">
        {backgroundSparkles.map((sparkle, i) => (
          <motion.div
            key={`bg-sparkle-${i}`}
            className="absolute text-pink-300/20 text-2xl"
            style={{
              top: `${sparkle.top}%`,
              left: `${sparkle.left}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 20, -20, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + (i * 0.5),
              delay: i * 0.3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            💫
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
export default LoveLetter