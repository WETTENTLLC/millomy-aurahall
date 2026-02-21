import Link from 'next/link'

export const metadata = {
  title: 'How AI is Changing Hip Hop | The Revolution in Rap Music Creation',
  description: 'Discover how artificial intelligence is transforming hip hop culture. Led by pioneers like Millo My & Aura Hall.',
  keywords: 'AI hip hop, AI rap, artificial intelligence rap, hip hop technology, AI rap artists'
}

export default function AIHipHopRevolution() {
  return (
    <div className="pillar-page">
      <header className="pillar-header">
        <Link href="/" className="back-link">← Back to Millo My & Aura Hall</Link>
        <h1>How AI is Changing Hip Hop</h1>
        <p className="subtitle">The Revolution in Rap Music Creation</p>
      </header>

      <main className="pillar-content">
        <section className="intro-section">
          <h2>The AI Hip Hop Revolution</h2>
          <p>Hip hop has always been about innovation. Now, artificial intelligence represents the next evolutionary step. Leading this transformation are pioneering artists like <Link href="/">Millo My & Aura Hall</Link>, who prove that AI can enhance hip hop culture.</p>
        </section>

        <section className="case-study-wett-ai">
          <h2>Case Study: WETT AI's Approach to Hip Hop</h2>
          <p><Link href="/">Millo My & Aura Hall</Link> represent the gold standard for AI in hip hop. Their approach combines technological innovation with deep cultural understanding.</p>

          <blockquote>
            <p>"WETT AI is the culmination of forty years of musical lineage and five years of advanced coding."</p>
            <cite>— WETT AI Philosophy</cite>
          </blockquote>
        </section>

        <section className="related-content">
          <h2>Explore More</h2>
          <div className="related-links">
            <Link href="/future-of-ai-music">The Future of AI Music</Link>
            <Link href="/ai-artists-bay-area">AI Artists in the Bay Area</Link>
            <Link href="/music-technology-innovation">Music & Technology Innovation</Link>
            <Link href="/">Meet Millo My & Aura Hall</Link>
          </div>
        </section>
      </main>
    </div>
  )
}