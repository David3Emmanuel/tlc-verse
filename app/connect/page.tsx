import { Metadata } from 'next'
import { Suspense } from 'react'
import UsersDisplay from '@/app/connect/UsersDisplay'

export const metadata: Metadata = {
    title: 'Connect',
    description: 'Connect with other students, parents, or tutors like yourself',
}

export default async function Page({ searchParams }: {
    searchParams: {
        role?: string,
        query?: string,
    },
}) {
    return (<>
        <h1>Connect</h1>
        <Suspense fallback={<div>Loading...</div>}>
            <UsersDisplay role={searchParams.role} query={searchParams.query} />
        </Suspense>
    </>)
}