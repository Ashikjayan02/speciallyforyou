'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HeartButton from './HeartButton'
interface Page4EnvelopeLetterProps {
  onSeal: () => void
}
const Page4EnvelopeLetter: React.FC<Page4EnvelopeLetterProps> = ({ onSeal }) => {
  const [isOpen, setIsOpen] = useState(false)
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
    }
  }
  const letterContent = `Unmaiya sollanum na…
Naan vaažhura oru oru second-um nee en pakkathulaye irukanum thonittey irukum… Nee yosichu pathiya… namma kulla adikadi sanda varra main reason namma kulla irukura distance thaan… 
Aanaaa… indha distance-thaan namma bonding-ah innum strong aakudhu… namma life-long together stay aaguradhuku konjam konjam ah help pannudhu… Ennatha sanda… misunderstanding vandhalum…
Nee enakanava  diiii… Nee dhaan en jeevan…en heartbeat… You are always mine 💋🎀🫶 En aasa pondatiyeeeeeeee 💋💋💋💋💋💋
                - Ashiksadhana🫶`
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 flex items-center justify-center p-4 z-50 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100"
    >
      {/* Floating heart decorations */}
      <motion.div className="absolute top-10 left-10 text-4xl animate-float">
        💕
      </motion.div>
      <motion.div className="absolute top-20 right-10 text-3xl animate-float" style={{ animationDelay: '0.5s' }}>
        ✨
      </motion.div>
      <motion.div className="absolute bottom-20 left-1/4 text-3xl animate-float" style={{ animationDelay: '1s' }}>
        💖
      </motion.div>
      <motion.div className="absolute bottom-10 right-1/4 text-4xl animate-float" style={{ animationDelay: '1.5s' }}>
        💕
      </motion.div>
      <AnimatePresence mode="wait">
        {!isOpen ? (
          // Closed Envelope
          <motion.div
            key="envelope-closed"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative flex flex-col items-center gap-6"
          >
            {/* Message above envelope */}
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 text-center"
            >
              A Special Letter For You 💌
            </motion.h2>
            {/* 3D Envelope */}
            <motion.div
              className="relative"
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              whileHover={{
                y: -20,
                transition: { duration: 0.3 }
              }}
            >
              <motion.div
                className="relative w-72 h-48 md:w-96 md:h-56 bg-gradient-to-br from-pink-200 to-purple-200 rounded-lg shadow-2xl shadow-purple-500/30 border-2 border-white/30 cursor-pointer transform-gpu"
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
                        viewBox="0 0 384 100"
                        className="drop-shadow-lg"
                        style={{
                          filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))'
                        }}
                      >
                        <defs>
                          <linearGradient id="flapGradient4" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#F9A8D4" />
                            <stop offset="100%" stopColor="#C084FC" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M 192 0 L 384 100 L 0 100 Z"
                          fill="url(#flapGradient4)"
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
                          ease: 'easeInOut'
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
                            ease: 'easeOut'
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
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-64 h-8 bg-black/20 rounded-full blur-xl" />
            </motion.div>
            {/* Instruction text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
              className="text-gray-600 text-base md:text-lg font-medium"
            >
              Click the envelope to open 💕
            </motion.p>
          </motion.div>
        ) : (
          // Opened Letter
          <motion.div
            key="letter-opened"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl w-full mx-auto"
          >
            {/* Letter Paper */}
            <motion.div
              className="relative bg-gradient-to-br from-yellow-50 to-pink-50 rounded-2xl shadow-2xl shadow-pink-300/40 border-4 border-pink-200/50 p-8 md:p-12"
              style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255, 182, 193, 0.1) 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }}
            >
              {/* Decorative elements */}
              <div className="absolute top-4 right-4 text-3xl animate-twinkle">✨</div>
              <div className="absolute bottom-4 left-4 text-3xl animate-twinkle" style={{ animationDelay: '0.5s' }}>💕</div>
              {/* Letter content */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-center space-y-6"
              >
                <div className="text-lg md:text-xl text-gray-800 font-serif italic whitespace-pre-wrap leading-relaxed">
                  {letterContent}
                </div>
              </motion.div>
            </motion.div>
            {/* Seal the Letter Button - Centered */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex justify-center mt-12"
            >
              <HeartButton onClick={onSeal}>
                Seal the Letter 💌
              </HeartButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
export default Page4EnvelopeLetter