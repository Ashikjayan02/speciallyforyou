"use client";
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import HeartButton from "./HeartButton";

interface Page2MusicInteractionProps {
  onNext: () => void;
}

const Page2MusicInteraction: React.FC<Page2MusicInteractionProps> = ({
  onNext,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleMusicToggle = async () => {
    if (audioRef.current) {
      try {
        if (isPlaying) {
          audioRef.current.pause();
        } else {
          audioRef.current.currentTime = 0;
          await audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
      } catch (error) {
        console.error("Audio playback error:", error);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed inset-0 flex items-center justify-center p-4 z-50"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative glass-card rounded-3xl p-8 md:p-12 max-w-md w-full mx-auto shadow-2xl shadow-pink-500/20 ring-4 ring-pink-400/30 border border-white/30"
      >
        {/* Decorative elements */}
        <div className="absolute -top-4 -left-4 text-2xl animate-float">🎵</div>
        <div
          className="absolute -top-2 -right-2 text-2xl animate-float"
          style={{ animationDelay: "0.5s" }}
        >
          ✨
        </div>
        <div
          className="absolute -bottom-2 -left-2 text-2xl animate-float"
          style={{ animationDelay: "1s" }}
        >
          🎶
        </div>
        <div
          className="absolute -bottom-4 -right-4 text-2xl animate-float"
          style={{ animationDelay: "1.5s" }}
        >
          💕
        </div>

        {/* Content */}
        <div className="relative text-center space-y-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400"
          >
            🎶 Music for You
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-gray-700 text-base md:text-lg"
          >
            I have a special song just for you. Tap the music icon to play it! 🎵
          </motion.p>

          {/* Music Player */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col items-center gap-6"
          >
            {/* Cover Image */}
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/30">
              <motion.img
                src="/Music/Snapchat-1396473283.jpg"
                alt="Music Cover"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />

              {/* Animated bars when playing */}
              {isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((bar) => (
                      <motion.div
                        key={bar}
                        className="w-2 bg-white/80 rounded-full"
                        animate={{ height: [10, 20, 30, 20, 10] }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: bar * 0.1,
                          ease: "easeInOut",
                        }}
                        style={{ height: "20px" }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Play/Pause Button */}
              <motion.button
                onClick={handleMusicToggle}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/40 hover:bg-black/30 transition-colors duration-300"
              >
                <motion.div
                  className={`w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-xl ${
                    isPlaying ? "bg-white/20" : "bg-white/90"
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  {isPlaying ? "⏸️" : "▶️"}
                </motion.div>
              </motion.button>
            </div>
          </motion.div>

          {/* Status text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-sm md:text-base text-gray-600"
          >
            {isPlaying ? "🎵 Music playing..." : "Tap to play the music"}
          </motion.p>

          {/* Next button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex justify-center pt-8"
          >
            <HeartButton onClick={onNext}>View More 🎬</HeartButton>
          </motion.div>
        </div>
      </motion.div>

      {/* Audio Element */}
      <audio ref={audioRef} src="/Music/For You.opus" crossOrigin="anonymous" />
    </motion.div>
  );
};

export default Page2MusicInteraction;
