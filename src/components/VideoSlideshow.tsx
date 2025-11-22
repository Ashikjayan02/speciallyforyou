'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
interface MediaContent {
  type: 'image' | 'video'
  src: string
  poster?: string
}
export default function VideoSlideshow({ onNext }: { onNext: () => void }) {
  const router = useRouter()
  const [currentMedia, setCurrentMedia] = useState<MediaContent | null>(null)
  const [showContent, setShowContent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  // TODO: Replace with your actual MP4 video URL
  const videoUrl = 'https://your-video-url.mp4' // Replace this with your actual video URL
  // Client-side media loading logic
  useEffect(() => {
    setIsLoading(true)
    // Skip image loading since you want video only
    // Directly set to video
    setTimeout(() => {
      setCurrentMedia({
        type: 'video',
        src: videoUrl,
        poster: 'https://images.unsplash.com/photo-1516594798947-e65505dbb29d?w=800&h=600&fit=crop' // Fallback poster
      })
      setIsLoading(false)
      setShowContent(true)
    }, 500) // Small delay for smooth transition
  }, [])
  const handleNext = () => {
    // Navigate to final letter page
    router.push('/final')
  }
  return (
    <div className="fixed inset-0 z-50">
      {/* Loading State */}
      {!showContent && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/20 backdrop-blur-sm">
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-pink-300 border-t-transparent mb-4"></div>
              <p className="text-pink-600 font-medium">Loading your special video...</p>
            </div>
          </div>
        </div>
      )}
      {/* Main Content */}
      <AnimatePresence mode="wait">
        {showContent && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="fixed inset-0 flex flex-col items-center justify-center p-4"
          >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            {/* Video Content Container */}
            <div className="relative w-full max-w-5xl mx-auto z-10">
              <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl border-2 border-pink-200">
                <div className="flex flex-col items-center">
                  <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-6 text-center">
                    ✨ Our Beautiful Memories ✨
                  </h2>
                  {/* Video Container */}
                  <div className="relative w-full max-w-3xl aspect-video rounded-xl overflow-hidden shadow-2xl mb-8">
                    {currentMedia?.type === 'video' && (
                      <video
                        className="w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                        poster={currentMedia.poster}
                        onLoadedData={() => {
                          console.log('Video loaded successfully')
                          setIsLoading(false)
                        }}
                        onError={(e) => {
                          console.error('Video failed to load:', e)
                          setIsLoading(false)
                          // You can show error state here
                        }}
                      >
                        <source src={currentMedia.src} type="video/mp4" />
                        <source src={currentMedia.src.replace('.mp4', '.webm')} type="video/webm" />
                        <div className="flex items-center justify-center h-full bg-pink-50 text-pink-600">
                          <p className="text-center p-8">
                            Unable to load video 😔
                            <br />
                            Please refresh the page or check your connection
                          </p>
                        </div>
                      </video>
                    )}
                  </div>
                  {/* Romantic Message */}
                  <div className="text-center mb-8">
                    <p className="text-lg text-gray-700 font-medium mb-4 leading-relaxed">
                      These precious moments we've shared...
                    </p>
                    <p className="text-lg text-gray-700 font-medium leading-relaxed">
                      ...are etched forever in my heart 💕
                    </p>
                  </div>
                  {/* Next Button */}
                  <motion.button
                    onClick={handleNext}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold py-4 px-12 rounded-full shadow-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-300 flex items-center gap-3 relative overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      <span>Next →</span>
                      <span className="text-xl">💕</span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                  </motion.button>
                </div>
              </div>
            </div>
            {/* Floating decorative elements */}
            <div className="absolute top-8 left-8 text-4xl opacity-20 animate-pulse">
              💖
            </div>
            <div className="absolute top-8 right-8 text-4xl opacity-20 animate-pulse" style={{ animationDelay: '0.5s' }}>
              💕
            </div>
            <div className="absolute bottom-8 left-8 text-4xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}>
              ✨
            </div>
            <div className="absolute bottom-8 right-8 text-4xl opacity-20 animate-pulse" style={{ animationDelay: '1.5s' }}>
              🌟
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Floating Background Hearts */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-pink-300 opacity-30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              fontSize: `${Math.random() * 20 + 15}px`,
              animation: `float ${Math.random() * 5 + 8}s ease-in-out infinite`
            }}
          >
            💕
          </div>
        ))}
      </div>
    </div>
  )
}