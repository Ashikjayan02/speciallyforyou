'use client'
import React, { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import BackgroundParticles from '@/components/BackgroundParticles'
import Page1LoveLetterIntro from '@/components/Page1LoveLetterIntro'
import Page2MusicInteraction from '@/components/Page2MusicInteraction'
import Page3VideoExperience from '@/components/Page3VideoExperience'
import Page4EnvelopeLetter from '@/components/Page4EnvelopeLetter'
import Page5SealedLetterPopup from '@/components/Page5SealedLetterPopup'
import VirtualKissAnimation from '@/components/VirtualKissAnimation'
import AudioToggle from '@/components/AudioToggle'
export default function Home() {
  const [currentStep, setCurrentStep] = useState(1)
  const [showKissAnimation, setShowKissAnimation] = useState(false)
  const handleExperienceAgain = () => {
    setCurrentStep(1)
    setShowKissAnimation(false)
  }
  const handleSendKiss = () => {
    setShowKissAnimation(true)
  }
  const handleKissComplete = () => {
    setTimeout(() => {
      setShowKissAnimation(false)
    }, 1000)
  }
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Particles */}
      <BackgroundParticles />
      {/* Main Content */}
      <div className="relative z-10 min-h-screen">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <Page1LoveLetterIntro
              key="page1"
              onShowMore={() => setCurrentStep(2)}
            />
          )}
          {currentStep === 2 && (
            <Page2MusicInteraction
              key="page2"
              onNext={() => setCurrentStep(3)}
            />
          )}
          {currentStep === 3 && (
            <Page3VideoExperience
              key="page3"
              onNext={() => setCurrentStep(4)}
            />
          )}
          {currentStep === 4 && (
            <Page4EnvelopeLetter
              key="page4"
              onSeal={() => setCurrentStep(5)}
            />
          )}
          {currentStep === 5 && (
            <Page5SealedLetterPopup
              key="page5"
              onExperienceAgain={handleExperienceAgain}
              onSendKiss={handleSendKiss}
            />
          )}
        </AnimatePresence>
      </div>
      {/* Virtual Kiss Animation */}
      <VirtualKissAnimation
        isActive={showKissAnimation}
        onComplete={handleKissComplete}
      />
      {/* Hidden h1 for accessibility */}
      <h1 className="sr-only">
        Romantic Surprise Experience - A Special Message for Princess
      </h1>
      {/* Audio Toggle */}
      <AudioToggle />
    </div>
  )
}