import { User, UserRole } from '@/lib/definitions'
import { getUsers, getUsersByRoles, getUsersByUsername, getUsersByUsernameAndRoles } from '@/actions/user'
import Link from 'next/link'

export default async function UsersDisplay({ role, query }: {
    role?: string,
    query?: string,
}) {
    await new Promise(resolve => setTimeout(resolve, 10_000))

    let results: User[]

    const roles = role
        ?.split(',')
        .filter(roleString => UserRole.hasOwnProperty(roleString.toUpperCase()))
        .map(roleString => UserRole[roleString.toUpperCase() as keyof typeof UserRole])
        || []

    try {
        if (roles.length > 0 && query) {
            results = await getUsersByUsernameAndRoles(query, roles)
        } else if (roles.length > 0) {
            results = await getUsersByRoles(roles)
        } else if (query) {
            results = await getUsersByUsername(query)
        } else {
            results = await getUsers()
        }
    } catch {
        return <div>Something went wrong.</div>
    }

    const roleHeading = roles.length > 0 ? roles.map(role => role + 's').join(', ') : 'users'
    const queryHeading = query ? ` matching "${query}"` : ''

    return (
        <div>
            <h1>Showing all {roleHeading + queryHeading}</h1>
            {results.length > 0 && <div>
                {results.map((user, i) => <Link key={i} href={`/profile/${user.username}`}>{user.username}</Link>)}
            </div>}
            {results.length === 0 && <p>No results</p>}
        </div>
    )
}