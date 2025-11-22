'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

const AudioToggle: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    // Create audio element
    if (typeof window !== 'undefined') {
      const audio = new Audio()
      audio.loop = true
      audio.volume = 0.3
      audio.preload = 'none'

      // Note: In a real implementation, you would add an actual audio file here
      // For demo purposes, we're creating a placeholder
      // audio.src = '/soft-melody.mp3'

      audio.addEventListener('canplaythrough', () => {
        setIsLoaded(true)
      })

      audio.addEventListener('error', () => {
        console.log('Audio file not found - audio feature disabled')
        setIsLoaded(false)
      })

      audioRef.current = audio

      return () => {
        if (audio) {
          audio.pause()
          audio.src = ''
        }
      }
    }
  }, [])

  const toggleAudio = () => {
    if (!audioRef.current || !isLoaded) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      // Play audio on user interaction (required by browsers)
      audioRef.current.play().catch(error => {
        console.log('Audio play failed:', error)
      })
    }
    setIsPlaying(!isPlaying)
  }

  // If no audio file is available, don't render the component
  if (!isLoaded) {
    return null
  }

  return (
    <motion.button
      onClick={toggleAudio}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center group"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, duration: 0.5 }}
    >
      {/* Glow effect when playing */}
      {isPlaying && (
        <motion.div
          className="absolute inset-0 rounded-full bg-pink-400/20"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0.2, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}

      {/* Music note icon */}
      <motion.div
        className="relative text-2xl"
        animate={isPlaying ? {
          rotate: [0, 10, -10, 0],
          scale: [1, 1.1, 1]
        } : {}}
        transition={{
          duration: 1,
          repeat: isPlaying ? Infinity : 0,
          ease: "easeInOut"
        }}
      >
        {isPlaying ? '🎵' : '🎶'}
      </motion.div>

      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-800/80 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {isPlaying ? 'Pause music' : 'Play romantic melody'}
        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800/80" />
      </div>

      {/* Pulse animation when playing */}
      {isPlaying && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-pink-400/30"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [1, 0, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      )}
    </motion.button>
  )
}

export default AudioToggle