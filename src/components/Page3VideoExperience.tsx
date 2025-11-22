'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HeartButton from './HeartButton'

const cutePNGs = [
  '/Photo/04d3e964c874b795d6a6f6e8e3702855.png',
  '/Photo/cute-rabbit-couple-love-happy-valentine-s-day-cartoon-character-illustration_513640-1598.png',
  '/Photo/f859355223e7184816564b07b71a69fc.png',
  '/Photo/images (20).png',
]

const SAMPLE_COLOR_IMAGE = '/mnt/data/2042f63d-5e36-45bb-a238-caa7e246ceb5.png'
const DEFAULT_VIDEO_SRC = '/video/New Project 7 [9CD6DBD].mp4'

type Particle = {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  duration: number
}

export default function Page3VideoExperience({
  onNext = () => {},
  videoSrc = DEFAULT_VIDEO_SRC,
}: {
  onNext?: () => void
  videoSrc?: string
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const offscreenRef = useRef<HTMLCanvasElement | null>(null)

  const [mounted, setMounted] = useState(false)
  const [targetColor, setTargetColor] = useState({ r: 0, g: 86, b: 139 })
  const tolerance = 49
  const spillReduction = 1

  const [processingReady, setProcessingReady] = useState(false)
  const [showSparkling, setShowSparkling] = useState(false)
  const [particles, setParticles] = useState<Particle[]>([])
  const [showCute, setShowCute] = useState<boolean[]>(new Array(cutePNGs.length).fill(false))

  useEffect(() => setMounted(true), [])

  // Sample key color
  useEffect(() => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = SAMPLE_COLOR_IMAGE
    img.onload = () => {
      try {
        const c = document.createElement('canvas')
        c.width = img.naturalWidth || 1
        c.height = img.naturalHeight || 1
        const ctx = c.getContext('2d')
        if (!ctx) return
        ctx.drawImage(img, 0, 0)
        const x = Math.floor(c.width / 2)
        const y = Math.floor(c.height / 2)
        const px = ctx.getImageData(x, y, 1, 1).data
        setTargetColor({ r: px[0], g: px[1], b: px[2] })
      } catch {
        console.warn('Failed to sample key color, using fallback.')
      } finally {
        setProcessingReady(true)
      }
    }
    img.onerror = () => setProcessingReady(true)
  }, [])

  // Autoplay muted video
  useEffect(() => {
    if (!mounted) return
    const v = videoRef.current
    if (!v) return
    v.loop = true
    v.muted = true
    v.playsInline = true
    v.crossOrigin = 'anonymous'
    v.play().catch(() => {})
  }, [mounted])

  // Chroma-key processing
  useEffect(() => {
    if (!mounted || !processingReady) return
    let rafId = 0
    let running = true
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return
    const off = offscreenRef.current || document.createElement('canvas')
    offscreenRef.current = off
    const ctx = canvas.getContext('2d')
    const offCtx = off.getContext('2d')
    if (!ctx || !offCtx) return

    const keyR = targetColor.r
    const keyG = targetColor.g
    const keyB = targetColor.b
    const tol = Math.max(0, Math.min(255, tolerance))
    const spill = Math.max(0, Math.min(1, spillReduction))

    const processFrame = () => {
      if (!running) return
      const vw = video.videoWidth || video.clientWidth
      const vh = video.videoHeight || video.clientHeight
      if (vw === 0 || vh === 0) {
        rafId = requestAnimationFrame(processFrame)
        return
      }
      const procW = Math.min(1280, vw)
      const procH = Math.floor((procW * vh) / vw)
      off.width = procW
      off.height = procH
      offCtx.drawImage(video, 0, 0, procW, procH)
      const frame = offCtx.getImageData(0, 0, procW, procH)
      const data = frame.data

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i]
        const g = data[i + 1]
        const b = data[i + 2]
        const dr = r - keyR
        const dg = g - keyG
        const db = b - keyB
        const dist = Math.sqrt(dr * dr + dg * dg + db * db)
        if (dist <= tol) data[i + 3] = 0
        else if (dist <= tol * 1.6) {
          const factor = (dist - tol) / (tol * 0.6)
          data[i + 3] = Math.floor(255 * Math.min(1, factor))
        }
        const blueness = b - Math.max(r, g)
        if (blueness > 8 && dist > tol * 0.9) {
          const reduction = Math.min(blueness / 255, spill)
          data[i + 2] = Math.floor(b * (1 - reduction))
        }
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(vw * dpr)
      canvas.height = Math.floor(vh * dpr)
      canvas.style.width = `${vw}px`
      canvas.style.height = `${vh}px`

      const tmp = document.createElement('canvas')
      tmp.width = procW
      tmp.height = procH
      const tmpCtx = tmp.getContext('2d')
      if (tmpCtx) {
        tmpCtx.putImageData(frame, 0, 0)
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(tmp, 0, 0, procW, procH, 0, 0, vw, vh)
      }

      rafId = requestAnimationFrame(processFrame)
    }

    rafId = requestAnimationFrame(processFrame)

    return () => {
      running = false
      cancelAnimationFrame(rafId)
    }
  }, [mounted, processingReady, targetColor])

  // Fade-in effects & particles
  useEffect(() => {
    if (!mounted) return

    // Sparkling text
    const sparkTimeout = setTimeout(() => setShowSparkling(true), 2000)

    // Cute PNGs fade-in
    cutePNGs.forEach((_, i) => {
      setTimeout(() => {
        setShowCute((prev) => {
          const newState = [...prev]
          newState[i] = true
          return newState
        })
      }, i * 500)
    })

    // Particles
    const temp: Particle[] = []
    for (let i = 0; i < 10; i++) {
      temp.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: 12 + Math.random() * 20,
        opacity: 0.3 + Math.random() * 0.6,
        duration: 4 + Math.random() * 6,
      })
    }
    setParticles(temp)

    return () => clearTimeout(sparkTimeout)
  }, [mounted])

  if (!mounted) return null

  // PNG positions for corners
  const pngPositions = [
    { top: '5%', left: '5%' }, // top-left
    { top: '5%', right: '5%' }, // top-right
    { bottom: '5%', left: '5%' }, // bottom-left
    { bottom: '5%', right: '5%' }, // bottom-right
  ]

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400" />

      <video
        ref={videoRef}
        src={videoSrc}
        style={{ display: 'none' }}
        crossOrigin="anonymous"
        playsInline
        muted
        loop
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="max-w-full max-h-full"
          style={{ objectFit: 'contain', width: '100%', height: '100%' }}
        />
      </div>

      {/* Cute PNGs - corners */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {cutePNGs.map((src, i) => (
          <AnimatePresence key={i}>
            {showCute[i] && (
              <motion.img
                src={src}
                className="absolute w-16 h-16 md:w-24 md:h-24"
                style={pngPositions[i]}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                exit={{ opacity: 0 }}
              />
            )}
          </AnimatePresence>
        ))}
      </div>

      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ x: p.x, y: p.y, opacity: 0 }}
            animate={{ y: p.y - 120, opacity: p.opacity }}
            transition={{ duration: p.duration, repeat: Infinity, ease: 'linear' }}
            className="absolute rounded-full bg-white/60"
            style={{
              width: p.size,
              height: p.size,
              left: 0,
              transform: `translate(${p.x}px, ${p.y}px)`,
              filter: 'blur(4px)',
            }}
          />
        ))}
      </div>

      {/* Center text */}
      <AnimatePresence>
        {showSparkling && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1, y: 120 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center pointer-events-none">
              <h1
                className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg"
                style={{
                  fontFamily: "'Comic Neue', 'Pacifico', cursive",
                  letterSpacing: '1px',
                  lineHeight: '1.2',
                }}
              >
                I Love You So Much<br />Bujjukuuuu 💖!!
              </h1>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40">
        <HeartButton onClick={onNext}>View More 💖</HeartButton>
      </div>
    </div>
  )
}
