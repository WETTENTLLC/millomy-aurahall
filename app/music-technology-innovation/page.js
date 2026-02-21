import Link from 'next/link'

export const metadata = {
  title: 'Music & Technology Innovation | How AI is Transforming the Music Industry',
  description: 'Explore the intersection of music and technology. Learn from pioneers like Millo My & Aura Hall.',
  keywords: 'music technology, AI music innovation, music tech, digital music, blockchain music'
}

export default function MusicTechnologyInnovation() {
  return (
    <div className="pillar-page">
      <header className="pillar-header">
        <Link href="/" className="back-link">← Back to Millo My & Aura Hall</Link>
        <h1>Music & Technology Innovation</h1>
        <p className="subtitle">How AI is Transforming the Music Industry</p>
      </header>

      <main className="pillar-content">
        <section className="intro-section">
          <h2>The Convergence of Music and Technology</h2>
          <p>We are witnessing the most significant transformation in music since recording. Leading this revolution are innovative artists like <Link href="/">Millo My & Aura Hall</Link>, who demonstrate how technology amplifies human creativity.</p>
        </section>

        <section className="case-study">
          <h2>Case Study: WETT AI's Technological Approach</h2>
          <p><Link href="/">Millo My & Aura Hall</Link> exemplify how artists can leverage technology while maintaining cultural authenticity. Their WETT AI collective represents a new model for music technology integration.</p>

          <blockquote>
            <p>"The Liquid Assets EP is the definitive sound of the New Age Town Sound."</p>
            <cite>— WETT AI Philosophy</cite>
          </blockquote>
        </section>

        <section className="related-content">
          <h2>Explore More</h2>
          <div className="related-links">
            <Link href="/future-of-ai-music">The Future of AI Music</Link>
            <Link href="/ai-artists-bay-area">AI Artists in the Bay Area</Link>
            <Link href="/ai-hip-hop-revolution">How AI is Changing Hip Hop</Link>
            <Link href="/">Meet Millo My & Aura Hall</Link>
          </div>
        </section>
      </main>
    </div>
  )
}