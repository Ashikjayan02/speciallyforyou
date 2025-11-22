// components/FinalLetter.tsx
'use client'
import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'

export default function FinalLetter() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [stage, setStage] = useState<'start'|'music'|'slideshow'|'final'|'closed'>('start')
  const [slideIndex, setSlideIndex] = useState(0)
  const slideshowTimer = useRef<number | null>(null)

  // assets - replace with /images/... after you copy to public
  const img1 = 'Only For You\public\video\New Project 7 [625206A].mp4'  // if you copied to public/images
  const img2 = '/images/heart2.png'
  // if you want to use direct uploaded files (temp), use these:
  // const img1 = '/mnt/data/283dad6f-76e6-4bc8-a8ba-814066fc3cb3.png'
  // const img2 = '/mnt/data/9a7080bc-1900-4337-9de9-27c030b999b8.png'

  const images = [img1, img2]

  // click handler: play audio then go to slideshow
  const handleOpen = async () => {
    if (!audioRef.current) return
    try {
      // user interaction allowed -> play audio
      await audioRef.current.play()
    } catch (err) {
      // if play blocked, still proceed
      console.warn('Audio play blocked', err)
    }
    setStage('music')
    // small delay so user hears music then we show slideshow
    setTimeout(() => setStage('slideshow'), 600) // 0.6s delay
  }

  // when slideshow starts, auto-advance slides then show final letter
  useEffect(() => {
    if (stage !== 'slideshow') {
      if (slideshowTimer.current) { window.clearInterval(slideshowTimer.current); slideshowTimer.current = null }
      return
    }
    // show each image for 2500ms, then after all show final
    const showDuration = 2500
    setSlideIndex(0)
    let i = 0
    slideshowTimer.current = window.setInterval(() => {
      i++
      if (i >= images.length) {
        // stop and show final after small delay
        if (slideshowTimer.current) { window.clearInterval(slideshowTimer.current); slideshowTimer.current = null }
        setTimeout(() => setStage('final'), 600)
        return
      }
      setSlideIndex(i)
    }, showDuration)
    return () => { if (slideshowTimer.current) window.clearInterval(slideshowTimer.current) }
  }, [stage])

  return (
    <div style={{minHeight:'60vh', display:'flex', alignItems:'center', justifyContent:'center', gap:20, padding:20}}>
      {/* audio element (hidden) */}
      <audio ref={audioRef} src="Only For You\public\Music\For You.opus" preload="auto" />

      {stage === 'start' && (
        <button
          onClick={handleOpen}
          style={{
            background:'linear-gradient(135deg,#ff9cc9,#ffc6e6)',
            border:'none',
            padding:'12px 20px',
            borderRadius:999,
            fontFamily:`'Dancing Script', cursive`,
            fontSize:20,
            cursor:'pointer',
            boxShadow:'0 8px 30px rgba(200,100,150,0.18)'
          }}
        >
          Open The Final Letter 💌
        </button>
      )}

      {stage === 'music' && (
        <div style={{textAlign:'center', opacity:0.95}}>
          <div style={{fontFamily:`'Merriweather', serif`, fontSize:18}}>Music is playing... ❤</div>
        </div>
      )}

      {stage === 'slideshow' && (
        <div style={{width:'min(760px,92%)', height: '420px', display:'flex', alignItems:'center', justifyContent:'center', position:'relative'}}>
          {images.map((src, idx) => (
            <div key={src}
              style={{
                position:'absolute',
                transform: idx === slideIndex ? 'translateY(0) scale(1)' : 'translateY(30px) scale(.95)',
                transition:'all 600ms cubic-bezier(.2,.9,.2,1)',
                opacity: idx === slideIndex ? 1 : 0,
                pointerEvents:'none',
                maxWidth:'80%',
                borderRadius:12,
              }}
            >
              <img src={src} alt={`slide-${idx}`} style={{width:'100%', height:'auto', borderRadius:12, boxShadow:'0 18px 50px rgba(120,40,80,0.12)'}}/>
            </div>
          ))}
        </div>
      )}

      {stage === 'final' && (
        <div style={{
          width:'min(820px,92%)',
          background:'linear-gradient(180deg, rgba(255,245,250,0.9), rgba(255,238,245,0.85))',
          padding:32,
          borderRadius:18,
          border:'2px solid rgba(255,192,215,0.9)',
          boxShadow:'0 30px 80px rgba(160,84,127,0.12)'
        }}>
          <div style={{display:'flex', justifyContent:'flex-end'}}>
            <button onClick={() => { audioRef.current?.pause(); audioRef.current!.currentTime = 0; setStage('start') }}
              style={{border:'none', background:'rgba(255,255,255,0.6)', borderRadius:'50%', width:36, height:36}}>✕</button>
          </div>
          <h1 style={{fontFamily:`'Dancing Script', cursive`, fontSize:42, color:'#b62f76', textAlign:'center'}}>✨ En Vaazhvin Oli Vizhake ✨</h1>

          <div style={{fontFamily:`'Merriweather', serif`, fontSize:18, lineHeight:1.7, color:'#3a2130', padding:'8px 10px'}}>
            <p><strong>Unmaiya sollanum na…</strong><br/> vaazhura oru oru second-um<br/> nee en pakkathulaye irukanum thonittey irukum…</p>
            <p><strong>Nee yosichu pathiya…</strong><br/> namma kulla adikadi sanda varra main reason<br/> namma kulla irukura <em>distance</em> thaan…</p>
            <p>Aanaaa…<br/> indha distance-thaan<br/> namma bonding-ah innum strong aakudhu…<br/> namma life-long together stay aaguradhuku<br/> konjam konjam ah help pannudhu…</p>
            <p>Ennatha sanda… misunderstanding vandhalum…<br/> nee enakana diiii…<br/> Nee dhaan en jeevan… en heartbeat…</p>
            <p><strong>You are always mine 💋🎀🫶<br/> En aasa pondatiyeeeeeeee 💋💋💋💋💋💋</strong></p>
            <div style={{textAlign:'right', marginTop:18, fontWeight:700}}>— Ashiksadhana</div>
          </div>
        </div>
      )}
    </div>
  )
}
