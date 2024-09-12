import { getCurrentUser } from '@/actions/user'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { Play } from 'next/font/google'
import { ContextProvider } from '@/app/game/utils/context'
import Header from './Header'

export const metadata: Metadata = {
    title: {
        template: '%s | Multiplayer | TLCverse',
        default: 'Multplayer | TLCverse',
    },
    description: 'TLCverse multiplayer - Teach, Learn, Connect',
}

const playFont = Play({
    weight: ['400', '700'],
    display: 'swap',
    subsets: ['latin'],
})

export default async function GameLayout({ children }: {
    children: React.ReactNode
}) {
    const { data: user, error } = await getCurrentUser()
    if (error) redirect('/login?redirect=/game')

    return (
        <ContextProvider>
            <div className={`${playFont.className} w-full h-screen flex flex-col overflow-x-hidden bg-neutral-700 p-5 text-white bg-texture`}>
                <Header />
                <main className='flex-1 pt-12'>
                    {children}
                </main>
            </div>
        </ContextProvider>
    )
}  
