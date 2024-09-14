import '@/app/globals.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  verification: {
    google: 'grIhPa2bbbnT1kt3eE6tucCV3uuEVcmSurWwrDg02AE',
  },
}

export default function RootLayout({ children }: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>
        {children}
      </body>
    </html>
  )
}
