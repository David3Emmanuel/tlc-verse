import { getCurrentUser } from '@/actions/user'
import Link from 'next/link'
import GetStarted from '@/components/GetStarted'

export default async function Avatar() {
    try {
        const { data: currentUser, error } = await getCurrentUser()
        if (error) throw new Error(error)

        console.log('Current user', currentUser?.username)

        return (
            <div className='h-full flex items-center'>
                <Link href={`/profile/${currentUser!.username}`} className='w-8 h-8 rounded-full bg-purple-500 font-medium text-white flex justify-center items-center text-xl'>
                    {currentUser!.username.charAt(0).toUpperCase()}
                </Link>
            </div>
        )
    } catch {
        return <GetStarted />
    }
}
