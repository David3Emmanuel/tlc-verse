import { Metadata } from 'next'
import { Suspense } from 'react'
import UsersDisplay from '@/app/(normal)/connect/UsersDisplay'
import Filters from '@/app/(normal)/connect/Filters'
import { UserRole } from '@/lib/definitions'
import { redirect } from 'next/navigation'

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
    const roles = searchParams.role
        ?.split(',')
        .filter(roleString => UserRole.hasOwnProperty(roleString.toUpperCase()))
        .map(roleString => UserRole[roleString.toUpperCase() as keyof typeof UserRole])
        || []
    const query = searchParams.query || ''

    // FIXME show loading on filter

    return (<div className='p-2 bg-white sm:bg-inherit h-full'>
        <h1 className='text-2xl font-medium mt-5 mb-2 sm:text-center'>Connect</h1>
        <div className='flex flex-col gap-2 w-full h-full sm:w-[40rem] sm:h-auto sm:my-5 mx-auto max-w-full px-2 py-5 bg-white sm:shadow sm:rounded-lg'>
            <Suspense fallback={null}>
                <Filters
                    filters={{ roles, query }}
                    submit={submit}
                />
            </Suspense>
            <Suspense fallback={(
                <h1 className='text-lg font-medium'>Loading...</h1>
            )}>
                <UsersDisplay roles={roles} query={query} />
            </Suspense>
        </div>
    </div>)
}

async function submit({ roles, query }: {
    roles?: UserRole[],
    query?: string,
}) {
    'use server'
    const roleString = roles?.map(role => role.toLowerCase()).join(',')
    const queryParams = []
    if (roleString) queryParams.push(`role=${roleString}`)
    if (query) queryParams.push(`query=${query}`)
    redirect(`/connect${queryParams.length > 0 ? '?' + queryParams.join('&') : ''}`)
}
