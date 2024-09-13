import { deleteSession } from '@/actions/session'
import { getCurrentUser, getUserByUsername, getUsers } from '@/actions/user'
import ProfilePic, { ProfilePicPlaceholder } from '@/components/ProfilePic'
import Tabs from '@/components/Tabs'
import Link from 'next/link'
import { Suspense } from 'react'
import Logout from './Logout'
import { UserRole } from '@/lib/definitions'

export async function generateStaticParams(): Promise<{ username: string }[]> {
    const { data: users, error } = await getUsers()
    if (error) throw new Error(error)
    return users!.map(user => ({ username: user.username }))
}

export function generateMetadata({ params }: {
    params: { username: string },
}) {
    return {
        title: `${params.username}'s Profile`,
        description: `View ${params.username}'s profile on TLCverse`,
    }
}

export default async function Page({ params }: {
    params: { username: string },
}) {
    let user

    try {
        const { data, error } = await getUserByUsername(params.username)
        if (error) throw new Error(error)
        user = data
    } catch (e) {
        console.error((e as Error).message)
        return <div>Something went wrong.</div>
    }

    if (!user) {
        return <div>User not found</div>
    }

    // TODO add profile sections
    const allTabs = {
        'student': { name: 'Student', content: <p>Student</p> },
        'tutor': { name: 'Tutor', content: <p>Tutor</p> },
        'parent': { name: 'Parent', content: <p>Parent</p> },
    }

    const sortedRoles = Object.values(UserRole).filter(role => user.roles.includes(role))
    const userTabs = Object.fromEntries(sortedRoles.map(role => {
        return [role as string, allTabs[role]]
    }))


    // TODO add followers and following (friends = mutual)
    // TODO add contact info

    const { data: currentUser } = await getCurrentUser()

    return (
        <div className='p-2 flex flex-col gap-5 sm:flex-row h-full justify-between bg-white sm:bg-transparent'>
            <div className='px-2 sm:px-0 flex sm:flex-col items-center gap-5 sm:gap-0 sm:bg-white sm:card sm:w-56 no-hover'>
                <div className='flex flex-col gap-2'>
                    <Suspense fallback={<ProfilePicPlaceholder />}>
                        <ProfilePic user={user} />
                    </Suspense>
                    {currentUser && currentUser.user_id === user.user_id
                        ? (
                            <div className='flex flex-col justify-center gap-2'>
                                <Link href='/settings' className='button mt-2 text-black bg-blue-50 hover:bg-blue-100 border border-neutral-300'>Edit Profile</Link>
                                <Logout deleteSession={deleteSession} />
                            </div>
                        )
                        : (
                            <Link href={`/chat/${params.username}`} className='button'>Message</Link>
                        )
                    }
                </div>
                <div className='flex-1 p-2 flex flex-col self-stretch'>
                    <h1 className='text-xl font-medium text-neutral-700'>{params.username}</h1>
                    <p>{user.roles.join(' • ')}</p>
                    <p className='text-neutral-700'>{user.first_name} {user.last_name}</p>
                    {user.bio && <p className='my-2'>{user.bio}</p>}
                </div>
            </div>
            <Suspense fallback={null}>
                <Tabs tabs={userTabs} />
            </Suspense>
        </div>
    )
}
