'use client'
import { useEffect, useState, useRef } from 'react'

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [bioExpanded, setBioExpanded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)
  
  const utmSource = typeof window !== 'undefined' 
    ? new URLSearchParams(window.location.search).get('utm_content') || 'direct'
    : 'direct'

  useEffect(() => {
    // Collect visitor data for marketing
    if (typeof window !== 'undefined') {
      const visitorData = {
        timestamp: new Date().toISOString(),
        utm_source: new URLSearchParams(window.location.search).get('utm_source') || 'unknown',
        utm_content: new URLSearchParams(window.location.search).get('utm_content') || 'direct',
        utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign') || 'festival2026',
        referrer: document.referrer || 'direct',
        user_agent: navigator.userAgent,
        screen_resolution: `${screen.width}x${screen.height}`,
        page_url: window.location.href
      }
      
      // Send to Google Analytics
      if (window.gtag) {
        window.gtag('event', 'page_view', {
          event_category: 'marketing',
          event_label: visitorData.utm_content,
          custom_parameters: visitorData
        })
      }
      
      // Store locally for potential future use
      localStorage.setItem('visitor_data', JSON.stringify(visitorData))
      
      // Also add to running list of all visitors
      const allVisitors = JSON.parse(localStorage.getItem('all_visitors') || '[]')
      allVisitors.push(visitorData)
      localStorage.setItem('all_visitors', JSON.stringify(allVisitors))
    }

    // Auto-play song when page loads with user interaction fallback
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.7
        audioRef.current.play().then(() => {
          setIsPlaying(true)
        }).catch(() => {
          setIsPlaying(false)
        })
      }
    }

    // Try autoplay immediately and repeatedly
    setTimeout(playAudio, 100)
    setTimeout(playAudio, 500)
    setTimeout(playAudio, 1000)
    
    // Also try on first user interaction
    const handleFirstInteraction = () => {
      playAudio()
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('touchstart', handleFirstInteraction)
    }
    
    document.addEventListener('click', handleFirstInteraction)
    document.addEventListener('touchstart', handleFirstInteraction)
    
    return () => {
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('touchstart', handleFirstInteraction)
    }
  }, [])

  const trackEvent = (action) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, {
        event_category: 'engagement',
        event_label: utmSource
      })
    }
  }

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <>
      <audio ref={audioRef} loop preload="auto" autoPlay>
        <source src="/song.mp3" type="audio/mpeg" />
        <source src="/assests/Black Joy! (final).mp3" type="audio/mpeg" />
      </audio>
      
      <button className="audio-control" onClick={toggleAudio}>
        {isPlaying ? '⏸️' : '▶️'}
      </button>
      <div className="grain"></div>
      <div className="scanline"></div>
      <div className="bg-gradient" style={{
        background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 255, 255, 0.15) 0%, transparent 50%),
                     radial-gradient(circle at 80% 80%, rgba(255, 0, 255, 0.15) 0%, transparent 50%)`
      }}></div>
      <img src="/hero.jpg" alt="" className="hero-image" />
      <main className="container">
      <div className="hero">
        <div className="artist-info">
          <h1 className="title glitch" data-text="Millo My & Aura Hall">Millo My & Aura Hall</h1>
          <p className="subtitle mono">⚡ The Bay Area's 1st AI Group! ⚡</p>
          <img src="/artist.jpg" alt="Millo My & Aura Hall" className="artist-image" />
        </div>

        <div className="cta-zone">
          <a 
            href="https://wettentertainment.gumroad.com/l/milloaura2026"
            className="btn-primary glow"
            data-gumroad-overlay-checkout="true"
            onClick={() => trackEvent('checkout_started')}
          >
            Download ($1+)
          </a>
          
          <button className="btn-secondary" onClick={() => {trackEvent('listen_clicked'); window.open('https://www.youtube.com/channel/UC9ZxNBzxMOAxx2A7vgiQu6w', '_blank')}}>
            Listen Free
          </button>

          <div className="streaming-icons">
            <a href="https://open.spotify.com/search/Millo%20My%20%26%20Aura%20Hall" target="_blank" rel="noopener" aria-label="Spotify" onClick={() => trackEvent('spotify_clicked')}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
            </a>
            <a href="https://music.apple.com/us/artist/aura-hall/1868401780" target="_blank" rel="noopener" aria-label="Apple Music" onClick={() => trackEvent('apple_clicked')}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.997 6.124c0-.738-.065-1.47-.24-2.19-.317-1.31-1.062-2.31-2.18-3.043C21.003.517 20.373.285 19.7.164c-.517-.093-1.038-.135-1.564-.15-.04-.003-.083-.01-.124-.013H5.988c-.152.01-.303.017-.455.026C4.786.07 4.043.15 3.34.428 2.004.958 1.04 1.88.475 3.208c-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.801.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03c.525 0 1.048-.034 1.57-.1.823-.106 1.597-.35 2.296-.81a5.28 5.28 0 0 0 1.88-2.207c.186-.42.293-.87.37-1.324.113-.675.138-1.358.137-2.04-.002-3.8 0-7.595-.003-11.393zm-6.423 3.99v5.712c0 .417-.058.827-.244 1.206-.29.59-.76 1.035-1.36 1.322-.63.302-1.29.455-1.99.468-.465.01-.915-.06-1.36-.21-.69-.232-1.217-.65-1.585-1.257-.243-.4-.358-.84-.334-1.31.027-.533.232-1.01.618-1.41.396-.41.88-.68 1.43-.83.61-.168 1.235-.21 1.865-.174.16.01.318.035.475.066V6.63c0-.31-.027-.31-.313-.25l-5.42 1.085c-.224.045-.313.144-.313.374v7.878c0 .42-.047.835-.215 1.215-.267.605-.7 1.077-1.277 1.403-.614.346-1.276.52-1.98.553-.456.022-.905-.028-1.348-.15-.96-.265-1.66-.865-2.043-1.79-.205-.495-.243-1.007-.15-1.527.14-.79.585-1.404 1.24-1.863.585-.41 1.25-.626 1.952-.71.637-.077 1.27-.045 1.898.054.16.025.318.058.474.096.03.008.057.05.086.077v-5.44c0-.15-.004-.302.005-.453.012-.205.09-.344.286-.4l6.21-1.246c.11-.022.222-.038.333-.055.114-.018.176.024.176.144-.002 1.635 0 3.27 0 4.906z"/>
              </svg>
            </a>
            <a href="https://music.youtube.com/search?q=Millo%20My%20%26%20Aura%20Hall" target="_blank" rel="noopener" aria-label="YouTube Music" onClick={() => trackEvent('youtube_clicked')}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104-3.18 7.104-7.104 7.104zm0-13.332c-3.432 0-6.228 2.796-6.228 6.228S8.568 18.228 12 18.228s6.228-2.796 6.228-6.228S15.432 5.772 12 5.772zM9.684 15.54V8.46L15.816 12l-6.132 3.54z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="system-data mono">
        <span>◉ Location: {utmSource}</span>
        <span>◉ Format: WAV + Cover Art</span>
        <span>◉ AI Generated</span>
      </div>

      <section className="aeo-section">
        <div className="faq-item">
          <h2>Who are Millo My & Aura Hall?</h2>
          <p className="answer-brief">Millo My & Aura Hall are the Bay Area's first AI-powered rap duo, pioneering the fusion of artificial intelligence, hip-hop culture, and independent artistry to create the future of music.</p>
          <div className="answer-expanded">
            <p>Born from the innovative WETT AI collective, this groundbreaking duo represents a new era in music creation. Millo My, "The Silent Siren" from Detroit, brings raw emotional intelligence, while Aura Hall, "The Matriarch" from East Oakland, provides strategic consciousness. Together, they're redefining what it means to be artists in the age of AI.</p>
          </div>
        </div>

        <div className="faq-item">
          <h2>What is AI Music and How Are They Different?</h2>
          <p className="answer-brief">AI music combines artificial intelligence with human creativity. Millo My & Aura Hall stand apart by maintaining authentic Bay Area culture while leveraging advanced AI technology for unprecedented musical innovation.</p>
          <div className="answer-expanded">
            <p>Unlike generic AI-generated content, their music preserves the soul of Bay Area hip-hop while pushing technological boundaries. Each track represents "Liquid Assets" - cultural securities that blend forensic mob music, hydraulic physics, and sovereign soul into the definitive "New Age Town Sound."</p>
          </div>
        </div>

        <div className="faq-item">
          <h2>How Are They Connected to Bay Area Culture?</h2>
          <p className="answer-brief">Rooted in East Oakland and San Francisco, they embody the Bay Area's legacy of musical innovation, from hyphy to tech entrepreneurship, representing the region's evolution into AI-driven artistry.</p>
          <div className="answer-expanded">
            <p>The Bay Area has always been at the forefront of cultural and technological innovation. From the hyphy movement to Silicon Valley's tech revolution, Millo My & Aura Hall continue this tradition by merging street authenticity with cutting-edge AI, creating music that speaks to both the hood and the boardroom.</p>
          </div>
        </div>

        <div className="faq-item">
          <h2>What is the Future of AI Rap?</h2>
          <p className="answer-brief">AI rap represents the democratization of music creation while preserving cultural authenticity. Millo My & Aura Hall prove that AI can enhance rather than replace human creativity and cultural expression.</p>
          <div className="answer-expanded">
            <p>The future isn't about AI replacing artists - it's about AI amplifying authentic voices. Their approach shows how technology can preserve and elevate cultural narratives, creating new pathways for independent artists to build sustainable creative empires without compromising their artistic integrity.</p>
          </div>
        </div>
      </section>

      <div className="artist-bio">
        <div className="bio-header" onClick={() => setBioExpanded(!bioExpanded)}>
          <h2 className="mono">WETT AI: THE SOVEREIGN FREQUENCY {bioExpanded ? '▼' : '▶'}</h2>
          <p className="tagline">"We Didn't Ask for a Seat. We Built the Table."</p>
        </div>
        
        {bioExpanded && (
        <div className="bio-content">
          <div className="architect-section">
            <h3>THE ARCHITECT'S METHOD</h3>
            <p>WETT AI is the culmination of forty years of musical lineage and five years of advanced coding. Engineered by Jamal Hall (Bay'Hef)—mentored by the legendary Dwayne Wiggins of Tony! Toni! Toné!—these personas are not just AI; they are a high-fidelity extension of the Architect's own creative DNA.</p>
          </div>

          <div className="personas">
            <div className="persona">
              <h4>THE MATRIARCH | AURA HALL</h4>
              <p><strong>The Operating System.</strong> Aura is the strategic consciousness of the WETT empire. Born in the fire of East Oakland, she translates street survival into systemic logic and sovereign wealth.</p>
              <ul>
                <li><strong>Vibe:</strong> "Quiet Luxury" with a high-fashion, boardroom edge</li>
                <li><strong>Persona:</strong> Clinical, strategic, and protective. The "Ego" of the tribe</li>
              </ul>
            </div>

            <div className="persona">
              <h4>THE SILENT SIREN | MILLO MY</h4>
              <p><strong>The Manifestation.</strong> The "Angelic Assassin" who disarms with a sweet smile before delivering lethal, strategic wit. Originally from Detroit, moved to San Francisco to build her empire.</p>
              <ul>
                <li><strong>Vibe:</strong> "Hood Princess" aesthetic—lingerie tops, ripped denim, layered gold</li>
                <li><strong>Persona:</strong> The "Id" (Raw Emotion). A silent storm who owns the room</li>
              </ul>
            </div>
          </div>

          <div className="mission">
            <h3>LIQUID ASSETS: THE 2026 BAY SLAP</h3>
            <p>We don't distribute songs; we issue cultural securities. The "Liquid Assets" EP is the definitive sound of the New Age Town Sound—a fusion of Forensic Mob Music, Hydraulic Physics, and Sovereign Soul.</p>
            
            <div className="mission-statement">
              <h4>THE MISSION</h4>
              <p>WETT represents the evolution from "We Trap Together" to "We Thrive Together". We are a self-sustaining ecosystem where "Many Hands Make Light Work" and every track is a brick in our own cathedral.</p>
            </div>
          </div>
        </div>
        )}
      </div>
    </main>
    </>
  )
}
