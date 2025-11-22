'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface VirtualKissAnimationProps {
  isActive: boolean
  onComplete: () => void
}

const VirtualKissAnimation: React.FC<VirtualKissAnimationProps> = ({
  isActive,
  onComplete
}) => {
  // Generate fixed kiss positions to avoid rendering issues
  const kissPositions = [
    { x: '10%', y: '10%', delay: 0 },
    { x: '20%', y: '30%', delay: 0.1 },
    { x: '30%', y: '15%', delay: 0.2 },
    { x: '40%', y: '40%', delay: 0.3 },
    { x: '50%', y: '20%', delay: 0.4 },
    { x: '60%', y: '35%', delay: 0.5 },
    { x: '70%', y: '25%', delay: 0.6 },
    { x: '80%', y: '45%', delay: 0.7 },
    { x: '90%', y: '15%', delay: 0.8 },
    { x: '85%', y: '60%', delay: 0.9 },
    { x: '25%', y: '70%', delay: 1 },
    { x: '55%', y: '80%', delay: 1.1 },
    { x: '75%', y: '75%', delay: 1.2 },
    { x: '15%', y: '85%', delay: 1.3 },
    { x: '45%', y: '55%', delay: 1.4 },
    { x: '70%', y: '65%', delay: 1.5 },
    { x: '35%', y: '50%', delay: 1.6 },
    { x: '65%', y: '70%', delay: 1.7 },
    { x: '20%', y: '60%', delay: 1.8 },
    { x: '80%', y: '80%', delay: 1.9 },
  ]

  if (!isActive) return null

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
      {kissPositions.map((pos, i) => (
        <motion.div
          key={i}
          initial={{
            x: pos.x,
            y: pos.y,
            opacity: 0,
            scale: 0,
          }}
          animate={{
            opacity: [0, 1, 1, 1, 0],
            scale: [0, 1.2, 1.2, 1, 0],
            y: `calc(${pos.y} - 100px)`,
          }}
          transition={{
            duration: 3,
            delay: pos.delay,
            ease: 'easeOut',
            repeat: Infinity,
            repeatDelay: 1,
          }}
          onAnimationComplete={(definition) => {
            if (i === kissPositions.length - 1 && definition.opacity === 0) {
              setTimeout(onComplete, 1000)
            }
          }}
          className="absolute text-4xl md:text-5xl"
          style={{
            left: pos.x,
            top: pos.y,
          }}
        >
          💋
        </motion.div>
      ))}
    </div>
  )
}

export default VirtualKissAnimation