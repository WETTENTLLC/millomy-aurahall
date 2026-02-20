import './globals.css'
import { Inter, JetBrains_Mono } from 'next/font/google'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata = {
  title: 'Millo My & Aura Hall | Festival 2026',
  description: 'Download the exclusive festival release',
}

export default function RootLayout({ children }) {
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
      </head>
      <body className={`${inter.variable} ${jetbrains.variable}`}>{children}</body>
    </html>
  )
}
