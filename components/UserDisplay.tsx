import { User } from '@/lib/definitions'
import Link from 'next/link'

export default function UserDisplay({ user }: { user: User }) {
    {
        return (
            <Link href={`/profile/${user.username}`} className='p-2 flex gap-2 hover:bg-neutral-50'>
                <p className='flex-1 max-w-64'>{user.username}</p>
                <p className='flex-1 text-neutral-700 text-sm'>{user.roles.join(' • ')}</p>
            </Link>
        )
    }
}