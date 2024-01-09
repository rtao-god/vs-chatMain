import '@/css/global/index.scss'
import { resetNextIdCounter } from '@/utils/misc'
import NextTopLoader from 'nextjs-toploader'

export const metadata = {
  title: 'Transportation Chat',
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  resetNextIdCounter()
  
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;600;700&family=Source+Sans+3:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <NextTopLoader color='var(--color-accent)' />
        {children}
      </body>
    </html>
  )
}
