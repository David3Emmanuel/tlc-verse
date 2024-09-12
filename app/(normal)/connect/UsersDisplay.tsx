import { User, UserRole } from '@/lib/definitions'
import { getUsers, getUsersByRoles, getUsersByUsername, getUsersByUsernameAndRoles } from '@/actions/user'
import Link from 'next/link'

export default async function UsersDisplay({ roles, query }: {
    roles: UserRole[],
    query: string,
}) {
    let results: User[]

    try {
        if (roles.length > 0 && query) {
            let { data, error } = await getUsersByUsernameAndRoles(query, roles)
            if (error) throw new Error(error)
            results = data!
        } else if (roles.length > 0) {
            let { data, error } = await getUsersByRoles(roles)
            if (error) throw new Error(error)
            results = data!
        } else if (query) {
            let { data, error } = await getUsersByUsername(query)
            if (error) throw new Error(error)
            results = data!
        } else {
            let { data, error } = await getUsers()
            if (error) throw new Error(error)
            results = data!
        }
    } catch {
        return <div>Something went wrong.</div>
    }

    let roleHeading: string
    if (roles.length === 0) roleHeading = 'users'
    else if (roles.length === 1) roleHeading = `${roles[0]}s`
    else if (roles.length === 2) roleHeading = `${roles[0]}s and ${roles[1]}s`
    else roleHeading = `${roles.slice(0, -1).join(', ')}, and ${roles.slice(-1)[0]}s`

    const queryHeading = query ? ` matching "${query}"` : ''

    // TODO add pagination

    return (
        <>
            <h1 className='text-lg font-medium'>Showing all {roleHeading + queryHeading}</h1>
            {results.length > 0 && <div className='flex flex-col gap-2'>
                {results.map((user, i) => <Link key={i} href={`/profile/${user.username}`}>{user.username}</Link>)}
            </div>}
            {results.length === 0 && <p>No results</p>}
        </>
    )
}