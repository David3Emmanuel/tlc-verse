import type { Metadata } from 'next'
import Header from '@/app/(normal)/Header'
import { Poppins } from 'next/font/google'


export const metadata: Metadata = {
  title: {
    template: '%s | TLCverse',
    default: 'TLCverse',
  },
  description: 'Teach, Learn, Connect',
}

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  subsets: ['latin'],
})

export default function NormalLayout({ children }: {
  children: React.ReactNode
}) {
  return (
    <div className={`${poppins.className} w-full h-screen flex flex-col overflow-x-hidden bg-violet-100 bg-texture`}>
      <Header />
      <main className='flex-1 flex flex-col'>
        {children}
      </main>
    </div>
  )
}
