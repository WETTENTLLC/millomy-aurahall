import './globals.css'
import { Inter, JetBrains_Mono } from 'next/font/google'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata = {
  title: 'Millo My & Aura Hall | Bay Area AI Rap Duo - The Future of Music & Technology',
  description: 'Millo My & Aura Hall are the Bay Area\'s pioneering AI-powered rap duo, blending technology, culture, and independent artistry to redefine the future of music.',
  keywords: 'AI music, Bay Area rap, AI artists, music technology, AI rap group, future of music, tech-driven artists, independent music, Bay Area culture',
  other: {
    'cache-control': 'no-cache, no-store, must-revalidate',
    'pragma': 'no-cache',
    'expires': '0'
  },
  openGraph: {
    title: 'Millo My & Aura Hall | Bay Area AI Music Pioneers',
    description: 'The Bay Area\'s first AI-powered rap duo revolutionizing music through technology and culture.',
    type: 'website',
    url: 'https://milloaura.netlify.app',
    images: [{
      url: '/hero.jpg',
      width: 1200,
      height: 630,
      alt: 'Millo My & Aura Hall - AI Music Duo'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Millo My & Aura Hall | AI Music Revolution',
    description: 'Bay Area\'s pioneering AI rap duo redefining the future of music and technology.',
    images: ['/hero.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MusicGroup",
        "@id": "https://milloaura.netlify.app/#musicgroup",
        "name": "Millo My & Aura Hall",
        "alternateName": ["Millo My and Aura Hall", "Bay Area AI Rap Duo"],
        "description": "The Bay Area's pioneering AI-powered rap duo, blending technology, culture, and independent artistry to redefine the future of music.",
        "genre": ["AI Music", "Hip Hop", "Rap", "Tech Music"],
        "foundingLocation": {
          "@type": "Place",
          "name": "Bay Area, California"
        },
        "member": [
          {
            "@type": "Person",
            "@id": "https://milloaura.netlify.app/#millomy",
            "name": "Millo My",
            "description": "The Silent Siren - Angelic Assassin who disarms with a sweet smile before delivering lethal, strategic wit.",
            "birthPlace": "Detroit, Michigan",
            "homeLocation": "San Francisco, California"
          },
          {
            "@type": "Person",
            "@id": "https://milloaura.netlify.app/#aurahall",
            "name": "Aura Hall",
            "description": "The Matriarch - Strategic consciousness of the WETT empire, translating street survival into systemic logic.",
            "birthPlace": "East Oakland, California"
          }
        ],
        "sameAs": [
          "https://open.spotify.com/search/Millo%20My%20%26%20Aura%20Hall",
          "https://music.apple.com/us/artist/aura-hall/1868401780",
          "https://music.youtube.com/search?q=Millo%20My%20%26%20Aura%20Hall",
          "https://www.youtube.com/channel/UC9ZxNBzxMOAxx2A7vgiQu6w"
        ],
        "url": "https://milloaura.netlify.app",
        "image": "https://milloaura.netlify.app/hero.jpg"
      },
      {
        "@type": "Organization",
        "@id": "https://milloaura.netlify.app/#wettai",
        "name": "WETT AI",
        "alternateName": "We Thrive Together AI",
        "description": "The Sovereign Frequency - AI music collective representing the evolution from 'We Trap Together' to 'We Thrive Together'.",
        "founder": {
          "@type": "Person",
          "name": "Jamal Hall",
          "alternateName": "Bay'Hef"
        },
        "location": "Bay Area, California",
        "industry": "AI Music Technology"
      },
      {
        "@type": "WebSite",
        "@id": "https://milloaura.netlify.app/#website",
        "url": "https://milloaura.netlify.app",
        "name": "Millo My & Aura Hall Official Site",
        "description": "Official website of Bay Area AI rap duo Millo My & Aura Hall",
        "publisher": {
          "@id": "https://milloaura.netlify.app/#musicgroup"
        }
      }
    ]
  }

  return (
    <html lang="en">
      <head>
        <Script src="https://gumroad.com/js/gumroad.js" strategy="beforeInteractive" />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-J1FZPQHYJ2" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-J1FZPQHYJ2');
          `}
        </Script>
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${inter.variable} ${jetbrains.variable}`}>{children}</body>
    </html>
  )
}
