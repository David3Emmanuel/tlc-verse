import { users } from '@/lib/dummy'
import Profile, { ProfilePlaceholder } from '@/app/profile/[username]/Profile'
import { Suspense } from 'react'

export function generateStaticParams() {
    return users.map(user => { username: user.username })
}

export default function Page({ params }: {
    params: { username: string },
}) {
    return (<>
        <h1>{params.username}</h1>
        <Suspense fallback={<ProfilePlaceholder />}>
            <Profile username={params.username} />
        </Suspense>
    </>)
}