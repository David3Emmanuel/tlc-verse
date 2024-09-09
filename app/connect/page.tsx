import UsersDisplay, { UsersDisplayPlaceholder } from '@/app/connect/UsersDisplay'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
    title: 'Connect',
    description: 'Connect with other students, parents, or tutors like yourself',
}

export default function Page() {
    return (<>
        <h1>Connect</h1>
        <Suspense fallback={<UsersDisplayPlaceholder />}>
            <UsersDisplay />
        </Suspense>
    </>)
}