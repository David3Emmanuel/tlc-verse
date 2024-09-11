import { getUser, getUsers } from '@/actions/user'
import ProfilePic, { ProfilePicPlaceholder } from '@/components/ProfilePic'
import Tabs from '@/components/Tabs'
import { Suspense } from 'react'

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
        const { data, error } = await getUser(params.username)
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

    const userTabs = Object.fromEntries(user.roles.map(role => {
        return [role as string, allTabs[role]]
    }))

    // TODO add followers and following (friends = mutual)
    // TODO add contact info
    // FIXME profile picture return default when tab is switched

    return (
        <div className='p-2 flex flex-col gap-5 sm:flex-row h-full justify-between bg-white sm:bg-transparent'>
            <div className='px-2 sm:px-0 flex sm:flex-col items-center gap-5 sm:gap-0 sm:bg-white sm:card sm:w-56 no-hover'>
                <Suspense fallback={<ProfilePicPlaceholder />}>
                    <ProfilePic user={user} />
                </Suspense>
                <div className='flex-1 p-2 flex flex-col self-stretch'>
                    <h1 className='text-xl font-medium text-neutral-700'>{params.username}</h1>
                    <p>{user.roles.join(' • ')}</p>
                    <p className='text-neutral-700'>{user.first_name} {user.last_name}</p>
                    {user.bio && <p className='my-2'>{user.bio}</p>}
                </div>
            </div>
            <Tabs tabs={userTabs} />
        </div>)
}
