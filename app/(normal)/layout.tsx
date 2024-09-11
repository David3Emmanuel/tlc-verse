import type { Metadata } from 'next'
import Header from '@/app/(normal)/Header'


export const metadata: Metadata = {
  title: {
    template: '%s | TLCverse',
    default: 'TLCverse',
  },
  description: 'Teach, Learn, Connect',
}

export default function NormalLayout({ children }: {
  children: React.ReactNode
}) {
  return (
    <div className='w-full h-screen flex flex-col overflow-x-hidden bg-violet-100 bg-texture'>
      <Header />
      <main className='flex-1'>
        {children}
      </main>
    </div>
  )
}
