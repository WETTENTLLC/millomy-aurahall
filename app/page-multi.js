'use client'

const PRODUCTS = [
  { title: 'Single 1 Title', url: 'https://wettentertainment.gumroad.com/l/single1' },
  { title: 'Single 2 Title', url: 'https://wettentertainment.gumroad.com/l/single2' },
  { title: 'Single 3 Title', url: 'https://wettentertainment.gumroad.com/l/single3' },
]

export default function Home() {
  const utmSource = typeof window !== 'undefined' 
    ? new URLSearchParams(window.location.search).get('utm_content') || 'direct'
    : 'direct'

  const trackEvent = (action, label) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, {
        event_category: 'engagement',
        event_label: label || utmSource
      })
    }
  }

  return (
    <main className="container">
      <div className="hero">
        <div className="artist-info">
          <h1 className="title">Millo My &<br/>Aura Hall</h1>
          <p className="subtitle mono">Festival 2026 Exclusive</p>
        </div>

        <div className="cta-zone">
          {PRODUCTS.map((product, i) => (
            <a 
              key={i}
              href={product.url}
              className={i === 0 ? "btn-primary glow" : "btn-primary"}
              data-gumroad-overlay-checkout="true"
              onClick={() => trackEvent('checkout_started', product.title)}
            >
              {product.title} ($1+)
            </a>
          ))}

          <div className="streaming-icons">
            <a href="https://open.spotify.com/artist/milloaura" target="_blank" rel="noopener" aria-label="Spotify" onClick={() => trackEvent('spotify_clicked')}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
            </a>
            <a href="https://music.apple.com/artist/milloaura" target="_blank" rel="noopener" aria-label="Apple Music" onClick={() => trackEvent('apple_clicked')}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.997 6.124c0-.738-.065-1.47-.24-2.19-.317-1.31-1.062-2.31-2.18-3.043C21.003.517 20.373.285 19.7.164c-.517-.093-1.038-.135-1.564-.15-.04-.003-.083-.01-.124-.013H5.988c-.152.01-.303.017-.455.026C4.786.07 4.043.15 3.34.428 2.004.958 1.04 1.88.475 3.208c-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.801.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03c.525 0 1.048-.034 1.57-.1.823-.106 1.597-.35 2.296-.81a5.28 5.28 0 0 0 1.88-2.207c.186-.42.293-.87.37-1.324.113-.675.138-1.358.137-2.04-.002-3.8 0-7.595-.003-11.393zm-6.423 3.99v5.712c0 .417-.058.827-.244 1.206-.29.59-.76 1.035-1.36 1.322-.63.302-1.29.455-1.99.468-.465.01-.915-.06-1.36-.21-.69-.232-1.217-.65-1.585-1.257-.243-.4-.358-.84-.334-1.31.027-.533.232-1.01.618-1.41.396-.41.88-.68 1.43-.83.61-.168 1.235-.21 1.865-.174.16.01.318.035.475.066V6.63c0-.31-.027-.31-.313-.25l-5.42 1.085c-.224.045-.313.144-.313.374v7.878c0 .42-.047.835-.215 1.215-.267.605-.7 1.077-1.277 1.403-.614.346-1.276.52-1.98.553-.456.022-.905-.028-1.348-.15-.96-.265-1.66-.865-2.043-1.79-.205-.495-.243-1.007-.15-1.527.14-.79.585-1.404 1.24-1.863.585-.41 1.25-.626 1.952-.71.637-.077 1.27-.045 1.898.054.16.025.318.058.474.096.03.008.057.05.086.077v-5.44c0-.15-.004-.302.005-.453.012-.205.09-.344.286-.4l6.21-1.246c.11-.022.222-.038.333-.055.114-.018.176.024.176.144-.002 1.635 0 3.27 0 4.906z"/>
              </svg>
            </a>
            <a href="https://music.youtube.com/channel/milloaura" target="_blank" rel="noopener" aria-label="YouTube Music" onClick={() => trackEvent('youtube_clicked')}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104-3.18 7.104-7.104 7.104zm0-13.332c-3.432 0-6.228 2.796-6.228 6.228S8.568 18.228 12 18.228s6.228-2.796 6.228-6.228S15.432 5.772 12 5.772zM9.684 15.54V8.46L15.816 12l-6.132 3.54z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="system-data mono">
        <span>Location: {utmSource}</span>
        <span>Format: WAV + Cover Art</span>
      </div>
    </main>
  )
}
