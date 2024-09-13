import { User } from '@/lib/definitions'
import Link from 'next/link'
import { Suspense } from 'react'
import LastMessage from '@/components/LastMessage'

export default function ChatPreview({ user }: { user?: User }) {
    if (!user) return (
        <div className='card hover:scale-[1.02] bg-white m-5 mx-auto max-w-[48rem] px-5'>
            Loading...
        </div>
    )

    return (
        <Link href={`/chat/${user.username}`} className='card hover:scale-[1.02] bg-white m-5 mx-auto max-w-[48rem] px-5'>
            <h2 className='font-medium text-neutral-700'>{user.username}</h2>
            <Suspense fallback={null}>
                <LastMessage user={user} />
            </Suspense>
        </Link>
    )
}
