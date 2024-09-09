import { getUsers } from '@/actions/user'
import Profile from '@/app/profile/[username]/Profile'
import { Suspense } from 'react'

export async function generateStaticParams() {
    const users = await getUsers()
    return users.map(user => { username: user.username })
}

export function generateMetadata({ params }: {
    params: { username: string },
}) {
    return {
        title: `${params.username}'s Profile`,
        description: `View ${params.username}'s profile on TLCverse`,
    }
}

export default function Page({ params }: {
    params: { username: string },
}) {
    return (<>
        <h1>{params.username}</h1>
        <Suspense fallback={<div>Loading...</div>}>
            <Profile username={params.username} />
        </Suspense>
    </>)
}