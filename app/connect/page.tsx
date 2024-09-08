import UsersDisplay, { UsersDisplayPlaceholder } from '@/app/connect/UsersDisplay'
import { Suspense } from 'react'

export default function Page() {
    return (<>
        <h1>Connect</h1>
        <Suspense fallback={<UsersDisplayPlaceholder />}>
            <UsersDisplay />
        </Suspense>
    </>)
}