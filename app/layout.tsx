import type { Metadata } from 'next'
import './globals.css'
import Header from '@/app/Header'


export const metadata: Metadata = {
  title: {
    template: '%s | TLCverse',
    default: 'TLCverse',
  },
  description: 'Teach, Learn, Connect',
}

export default function RootLayout({ children }: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
