'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { User, UserRole } from '@/lib/definitions'
import { users } from '@/lib/dummy'

export default async function UsersDisplay() {
    const searchParams = useSearchParams()
    let results: User[]
    
    await new Promise((resolve, reject) => {
        setTimeout(resolve, 5000)
    })

    const roles = searchParams.get('role')
        ?.split(',')
        .filter(roleString => UserRole.hasOwnProperty(roleString.toUpperCase()))
        .map(roleString => UserRole[roleString.toUpperCase() as keyof typeof UserRole])
        || []

    if (roles.length > 0) {
        results = users.filter(user => {
            for (const role of user.roles) {
                if (roles.includes(role)) return true
            }
            return false
        })
    } else {
        results = users
    }

    const searchHeading = roles.length > 0 ? roles.map(role => role+'s').join(', ') : 'users'
    return (
        <div>
            <h1>Showing all {searchHeading}</h1>
            {results.length > 0 && <div>
                {results.map(user => <Link href={`/profile/${user.username}`}>{user.username}</Link>)}
            </div>}
            {results.length === 0 && <p>No results</p>}
        </div>
    )
}

export function UsersDisplayPlaceholder() {
    return (
        <div>
            <h1>Searching...</h1>
        </div>
    )
}
