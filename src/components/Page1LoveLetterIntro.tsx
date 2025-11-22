
'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HeartButton from './HeartButton'
interface Page1Props {
  onShowMore: () => void
}
const Page1LoveLetterIntro: React.FC<Page1Props> = ({ onShowMore }) => {
  const [envelopeOpened, setEnvelopeOpened] = useState(false)
  const [letterExtracted, setLetterExtracted] = useState(false)
  const [showButton, setShowButton] = useState(false)
  // Sparkle positions for envelope opening animation
  const sparklePositions = [
    { x: -60, y: -40, rotate: 120, delay: 0 },
    { x: 40, y: -60, rotate: 240, delay: 0.1 },
    { x: -80, y: 30, rotate: 180, delay: 0.2 },
    { x: 60, y: 50, rotate: 300, delay: 0.3 },
    { x: -40, y: 70, rotate: 60, delay: 0.4 },
    { x: 80, y: -20, rotate: 360, delay: 0.5 },
  ]
  React.useEffect(() => {
    // Show button after letter is revealed
    if (letterExtracted) {
      const timer = setTimeout(() => {
        setShowButton(true)
      }, 2500)
      return () => clearTimeout(timer)
    }
  }, [letterExtracted])
  const handleEnvelopeClick = () => {
    if (!envelopeOpened) {
      setEnvelopeOpened(true)
      // Extract letter after envelope opening animation
      setTimeout(() => {
        setLetterExtracted(true)
      }, 600)
    }
  }
  const letterContent = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="space-y-6 text-center"
    >
      <p className="text-lg md:text-xl font-medium leading-relaxed italic" style={{ color: '#A0826D' }}>
        En Sadhu kutty ehh!!,
      </p>
      <p className="text-base md:text-lg leading-relaxed" style={{ color: '#8B7355' }}>
                             Naan unai sandhithadhum vidhial eh!
                            Naan unaku endru vaazhvadhum vidhial ehh! Yenadi ivalo thamadham?
                            Enanai undrodhu inika! Enmedhu vizhum un oru oru moochukatrum 
                            Enai melum melum en manadhai un mandhodhu inika thona veikumadi
                            Thai thedum siru pillai pola annen adii!!!
                            Vaazhvatharuku orey Karanam nee adi!!!
                                                        -Ipadiku ashiksadhana❤
      </p>
    </motion.div>
  )
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
      {/* Floating hearts decoration */}
      <motion.div
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-12 left-12 text-4xl opacity-40"
      >
        💕
      </motion.div>
      <motion.div
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute top-16 right-12 text-3xl opacity-40"
      >
        ✨
      </motion.div>
      <motion.div
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-16 left-8 text-3xl opacity-40"
      >
        💖
      </motion.div>
      <motion.div
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        className="absolute bottom-12 right-8 text-4xl opacity-40"
      >
        💝
      </motion.div>
      {/* Main Content - Envelope or Letter */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="relative w-full max-w-2xl mx-auto"
      >
        <div className="relative flex flex-col items-center">
          {/* Title above envelope */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-8"
          >
            💌 A Special Letter For You 💌
          </motion.h1>
          {/* 3D Envelope Container */}
          <motion.div
            className="relative"
            style={{
              perspective: '1500px',
              transformStyle: 'preserve-3d'
            }}
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {/* Envelope Body */}
            <motion.div
              className="relative w-80 h-56 md:w-96 md:h-72 bg-gradient-to-br from-rose-200 via-pink-200 to-purple-200 rounded-xl shadow-2xl shadow-purple-500/40 border-2 border-white/40 transform-gpu"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(90deg, transparent, transparent 35px, rgba(255,255,255,0.1) 35px, rgba(255,255,255,0.1) 70px),
                  repeating-linear-gradient(0deg, transparent, transparent 35px, rgba(255,255,255,0.1) 35px, rgba(255,255,255,0.1) 70px)
                `,
              }}
            >
              {/* Rectangular Letter Tab */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-24 h-16 md:w-32 md:h-20 bg-amber-50 rounded-t-lg shadow-lg border-2 border-orange-200"
                   style={{ backgroundColor: '#F5E6D3' }}>
                <div className="flex items-center justify-center h-full">
                  <span className="text-sm md:text-base font-semibold" style={{ color: '#8B7355' }}>Love Letter</span>
                </div>
              </div>
              {/* Envelope decoration lines */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-0.5 bg-white/30 absolute top-1/3" />
                <div className="w-full h-0.5 bg-white/30 absolute bottom-1/3" />
                <div className="h-full w-0.5 bg-white/30 absolute left-1/3" />
                <div className="h-full w-0.5 bg-white/30 absolute right-1/3" />
              </div>
              {/* Letter inside envelope (visible when closed) */}
              <AnimatePresence>
                {!envelopeOpened && (
                  <motion.div
                    className="absolute inset-4 bg-amber-50 rounded-lg shadow-inner"
                    style={{
                      backgroundColor: '#F5E6D3'
                    }}
                    initial={{ opacity: 0.7 }}
                    animate={{ opacity: 0.7 }}
                  >
                    <div className="absolute top-2 left-2 right-2 h-1 bg-orange-300 opacity-30" />
                    <div className="absolute top-4 left-2 right-2 h-1 bg-orange-300 opacity-20" />
                    <div className="absolute top-6 left-2 right-4 h-1 bg-orange-300 opacity-20" />
                    <div className="absolute bottom-4 left-2 right-4 h-1 bg-orange-300 opacity-20" />
                  </motion.div>
                )}
              </AnimatePresence>
              {/* Heart seal in center of envelope - Clickable */}
              <AnimatePresence>
                {!envelopeOpened && (
                  <motion.button
                    onClick={handleEnvelopeClick}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-7xl bg-transparent border-none cursor-pointer z-10"
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    animate={{
                      scale: [1, 1.2, 1],
                      filter: ['drop-shadow(0 0 15px rgba(255, 182, 193, 0.8))', 'drop-shadow(0 0 25px rgba(255, 182, 193, 1))', 'drop-shadow(0 0 15px rgba(255, 182, 193, 0.8))']
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    style={{
                      filter: 'drop-shadow(0 0 20px rgba(255, 182, 193, 0.9))'
                    }}
                  >
                    💖
                  </motion.button>
                )}
              </AnimatePresence>
              {/* Envelope flap */}
              <AnimatePresence>
                {!envelopeOpened && (
                  <motion.div
                    initial={{ rotateX: 0 }}
                    animate={{ rotateX: envelopeOpened ? 180 : 0 }}
                    exit={{ rotateX: 180 }}
                    transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                    style={{
                      transformOrigin: 'top center',
                      transformStyle: 'preserve-3d'
                    }}
                    className="absolute -top-28 left-0 w-0 h-0"
                  >
                    {/* Triangle flap shape with better design */}
                    <svg
                      width="100%"
                      height="140"
                      viewBox="0 0 384 140"
                      className="drop-shadow-lg filter"
                      style={{
                        filter: 'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.12))'
                      }}
                    >
                      <defs>
                        <linearGradient id="flapGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#F9A8D4" />
                          <stop offset="50%" stopColor="#E8B4F3" />
                          <stop offset="100%" stopColor="#C084FC" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M 192 0 L 384 140 L 0 140 Z"
                        fill="url(#flapGradient2)"
                        stroke="rgba(255, 255, 255, 0.4)"
                        strokeWidth="3"
                      />
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>
              {/* Enhanced opening animation sparkles */}
              <AnimatePresence>
                {envelopeOpened && (
                  <>
                    {sparklePositions.map((pos, i) => (
                      <motion.div
                        key={i}
                        className="absolute text-4xl"
                        style={{
                          top: '50%',
                          left: '50%',
                        }}
                        initial={{
                          scale: 0,
                          opacity: 0,
                          x: 0,
                          y: 0,
                          rotate: 0
                        }}
                        animate={{
                          scale: [0, 1.5, 2, 0],
                          opacity: [0, 1, 1, 0],
                          x: pos.x,
                          y: pos.y,
                          rotate: pos.rotate
                        }}
                        exit={{ opacity: 0 }}
                        transition={{
                          duration: 1.2,
                          delay: pos.delay * 0.5,
                          ease: [0.25, 0.46, 0.45, 0.94]
                        }}
                      >
                        {['✨', '💫', '⭐', '🌟', '💖', '💕', '🌸', '💝'][i]}
                      </motion.div>
                    ))}
                  </>
                )}
              </AnimatePresence>
              {/* Extracted Letter - Centered and Fixed */}
              <AnimatePresence>
                {letterExtracted && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                      rotateX: 10
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      rotateX: 0
                    }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.1,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    className="absolute inset-0 z-20 flex items-center justify-center"
                  >
                    <div className="bg-amber-50 rounded-lg p-8 md:p-12 shadow-2xl border-2 border-orange-200 max-w-lg mx-auto"
                      style={{
                        backgroundColor: '#F5E6D3'
                      }}
                    >
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                        className="text-center space-y-6 relative"
                      >
                        <div className="absolute top-3 right-3 text-xl animate-twinkle">✨</div>
                        <div className="absolute bottom-3 left-3 text-xl animate-twinkle" style={{ animationDelay: '0.5s' }}>💕</div>
                        <div className="absolute top-1/2 left-3 text-xl animate-twinkle" style={{ animationDelay: '1s' }}>🌸</div>
                        <div className="absolute top-1/3 right-3 text-xl animate-twinkle" style={{ animationDelay: '1.5s' }}>💝</div>
                        <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
                          En Sadhu kutty ehh!!
                        </h2>
                        <div className="text-base md:text-lg space-y-3 leading-relaxed" style={{ color: '#A0826D' }}>
                          <p className="font-medium italic">My Bujjukkuu!!,</p>
                          <p>Naan unai sandhithadhum vidhial eh!
                            Naan unaku endru vaazhvadhum vidhial ehh! Yenadi ivalo thamadham?
                            Enanai undrodhu inika! Enmedhu vizhum un oru oru moochukatrum 
                            Enai melum melum en manadhai un mandhodhu inika thona veikumadi
                            Thai thedum siru pillai pola annen adii!!!
                            Vaazhvatharuku orey Karanam nee adi!!!
                                                        -Ipadiku ashiksadhana❤</p>
                          <p className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
                            You are my everything💕...
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            {/* Enhanced shadow */}
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-72 h-10 bg-gradient-to-r from-black/20 via-black/30 to-black/20 rounded-full blur-2xl" />
            {/* Show More Button - appears after letter is extracted */}
            <AnimatePresence>
              {showButton && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="flex justify-center pt-35"
                >
                  <HeartButton onClick={onShowMore}>
                    Show More 💌
                  </HeartButton>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          {/* Instruction text */}
          <AnimatePresence>
            {!envelopeOpened && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                className="text-gray-600 text-base md:text-lg font-medium mt-8 animate-pulse"
              >
                Click the heart seal to open the envelope💖
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  )
}
export default Page1LoveLetterIntro;