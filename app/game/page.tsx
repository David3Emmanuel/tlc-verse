import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Multiplayer',
    description: 'Challenge your friends in a fun, competitive quiz game and top the leaderboard',
}

export default function Page() {
    return (<>
        <h1 className='text-center text-3xl'>Multiplayer</h1>
        <Link href='/' className='fixed top-5 left-5 px-5 py-2 font-medium rounded bg-neutral-500'>Back to Home</Link>
    </>)
}