import { getCurrentUser, getUserById } from '@/actions/user'
import Link from 'next/link'
import GetStarted from '@/components/GetStarted'
import Image from 'next/image'

export default async function Avatar({ label, underline }: {
    label?: string,
    underline?: boolean,
}) {
    try {
        const { data: currentSessionUser, error } = await getCurrentUser()
        if (error) throw new Error(error)

        const username = currentSessionUser!.username
        const { data: currentUser } = await getUserById(currentSessionUser!.user_id)

        return (
            <Link href={`/profile/${username}`} className='h-full flex items-center justify-center'>
                {!currentUser?.profile_pic && <div className='w-8 h-8 rounded-full bg-purple-500 font-medium text-white flex justify-center items-center text-xl'>
                    {username.charAt(0).toUpperCase()}
                </div>}
                {currentUser?.profile_pic && (
                    <div className='w-8 h-8 relative rounded-full overflow-hidden'>
                        <Image src={currentUser.profile_pic} className='object-cover' fill alt='Profile pic' />
                    </div>
                )}
                {label && <div className={`ml-2 ${underline ? 'underline' : ''}`}>{label}</div>}
            </Link>
        )
    } catch {
        return <GetStarted />
    }
}
