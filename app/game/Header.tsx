import Link from 'next/link'
import Avatar from '@/components/Avatar'

export default function Header() {
    return <header className='fixed top-0 left-0 right-0 px-5 py-5 flex justify-between'>
        <Link href='/' className='z-10 px-5 py-2 font-medium rounded bg-neutral-500'>Back to Home</Link>
        <h1 className='text-center text-3xl flex-1 absolute left-0 right-0 top-5'>Multiplayer</h1>
        <div className='z-10'>
            <Avatar />
        </div>
    </header>
}