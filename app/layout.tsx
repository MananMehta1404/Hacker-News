import './globals.css'

import { Navbar } from '@/components'

export const metadata = {
  title: 'Hacker News',
  description: 'Stay Informed with the Latest News from Around the Globe!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="relative">
        <div className='main'>
          <div className='gradient' />
        </div>

        <main className='app'>
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  )
}
