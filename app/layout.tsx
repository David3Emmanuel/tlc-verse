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
      <body className='w-full h-screen overflow-x-hidden bg-violet-100 bg-texture'>
        <Header />
        <main className='h-full'>
          {children}
        </main>
      </body>
    </html>
  )
}
