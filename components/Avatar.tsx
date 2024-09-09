import { getCurrentUser } from '@/actions/user'
import Link from 'next/link'
import GetStarted from '@/components/GetStarted'

export default async function Avatar({ label }: {
    label?: string,
}) {
    try {
        const { data: currentUser, error } = await getCurrentUser()
        if (error) throw new Error(error)

        const username = currentUser!.username

        return (
            <div className='h-full flex items-center justify-center'>
                <Link href={`/profile/${username}`} className='w-8 h-8 rounded-full bg-purple-500 font-medium text-white flex justify-center items-center text-xl'>
                    {username.charAt(0).toUpperCase()}
                </Link>
                {label && <Link href={`/profile/${username}`} className='ml-2'>{label}</Link>}
            </div>
        )
    } catch {
        return <GetStarted />
    }
}
