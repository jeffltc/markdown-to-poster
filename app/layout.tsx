import React from 'react'
import './globals.css'
import { Inter } from 'next/font/google'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Markdown Poster',
  description: 'Convert markdown to beautiful posters',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-93P9DBBNVR"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-93P9DBBNVR');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        {children}
        <footer className="fixed bottom-0 left-0 right-0 p-2 text-center text-sm text-gray-500 bg-white/80 backdrop-blur-sm">
          Inspired by <a href="https://beeposter.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-700">beeposter.com</a>
        </footer>
      </body>
    </html>
  )
}
