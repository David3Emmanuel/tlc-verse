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
      <body className='min-h-screen bg-neutral-100'>
        <Header />
        <main className='p-2'>
          {children}
        </main>
      </body>
    </html>
  )
}
