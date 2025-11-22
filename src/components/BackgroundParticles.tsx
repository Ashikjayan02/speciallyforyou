'use client'

import React, { memo, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  type: 'heart' | 'sparkle'
  animationDuration: number
  animationDelay: number
  opacity: number
}

const BackgroundParticles: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    // Generate particles only on client side
    const generateParticles = () => {
      const particleCount = typeof window !== 'undefined' && window.innerWidth < 768 ? 12 : 20
      const newParticles: Particle[] = []

      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 20 + 16, // 16px to 36px
          type: Math.random() > 0.5 ? 'heart' : 'sparkle',
          animationDuration: Math.random() * 10 + 15, // 15s to 25s
          animationDelay: Math.random() * 5, // 0s to 5s
          opacity: Math.random() * 0.3 + 0.1, // 0.1 to 0.4
        })
      }

      setParticles(newParticles)
    }

    generateParticles()
  }, [])

  if (typeof window === 'undefined') {
    return null
  }

  const HeartSVG: React.FC<{ size: number }> = ({ size }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="rgba(255, 182, 193, 0.6)"
      className="filter blur-sm"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  )

  const SparkleSVG: React.FC<{ size: number }> = ({ size }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="rgba(255, 215, 0, 0.6)"
      className="filter blur-sm"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: particle.opacity,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 10, -10, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: particle.animationDuration,
            delay: particle.animationDelay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {particle.type === 'heart' ? (
            <HeartSVG size={particle.size} />
          ) : (
            <SparkleSVG size={particle.size} />
          )}
        </motion.div>
      ))}
    </div>
  )
}

export default memo(BackgroundParticles);