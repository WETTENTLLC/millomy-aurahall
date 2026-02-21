import Link from 'next/link'

export const metadata = {
  title: 'AI Artists in the Bay Area | The Hub of Artificial Intelligence Music Innovation',
  description: 'Discover the Bay Area AI music scene led by pioneers like Millo My & Aura Hall.',
  keywords: 'Bay Area AI artists, AI music Bay Area, Silicon Valley music, Bay Area hip hop'
}

export default function AIArtistsBayArea() {
  return (
    <div className="pillar-page">
      <header className="pillar-header">
        <Link href="/" className="back-link">← Back to Millo My & Aura Hall</Link>
        <h1>AI Artists in the Bay Area</h1>
        <p className="subtitle">The Hub of Artificial Intelligence Music Innovation</p>
      </header>

      <main className="pillar-content">
        <section className="intro-section">
          <h2>Why the Bay Area Leads AI Music Innovation</h2>
          <p>The San Francisco Bay Area has become the undisputed global center for AI music innovation. Artists like <Link href="/">Millo My & Aura Hall</Link> are pioneering a new era of culturally authentic AI-powered music.</p>
        </section>

        <section className="leading-artists">
          <h2>Leading the Movement: Millo My & Aura Hall</h2>
          <p><Link href="/">Millo My & Aura Hall</Link> represent the pinnacle of Bay Area AI music innovation. As the region's first AI-powered rap duo, they have established the template for how artificial intelligence can enhance cultural authenticity.</p>
          
          <blockquote>
            <p>"We didn't ask for a seat. We built the table."</p>
            <cite>— WETT AI: The Sovereign Frequency</cite>
          </blockquote>
        </section>

        <section className="related-content">
          <h2>Explore More</h2>
          <div className="related-links">
            <Link href="/future-of-ai-music">The Future of AI Music</Link>
            <Link href="/music-technology-innovation">Music & Technology Innovation</Link>
            <Link href="/independent-tech-music">Independent Tech-Driven Music</Link>
            <Link href="/">Meet Millo My & Aura Hall</Link>
          </div>
        </section>
      </main>
    </div>
  )
}