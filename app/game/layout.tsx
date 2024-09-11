import { getCurrentUser } from '@/actions/user'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
    title: {
        template: '%s | Multiplayer | TLCverse',
        default: 'Multplayer | TLCverse',
    },
    description: 'TLCverse multiplayer - Teach, Learn, Connect',
}

export default async function GameLayout({ children }: {
    children: React.ReactNode
}) {
    const { data: user, error } = await getCurrentUser()
    if (error) redirect('/login?redirect=/game')

    return (
        <div className='w-full h-screen flex flex-col overflow-x-hidden bg-neutral-700 bg-texture'>
            <main className='flex-1'>
                {children}
            </main>
        </div>
    )
}  
