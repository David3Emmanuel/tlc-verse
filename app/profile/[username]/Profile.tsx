import { UserRole } from '@/lib/definitions'
import { users } from '@/lib/dummy'

export default async function Profile({ username }: {
    username: string,
}) {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const user = users.find(user => user.username === username)
    if (!user) {
        return <div>User not found</div>
    }
    return (
        <div>
            <h1>{user.firstName} {user.lastName}</h1>
            {user.roles.includes(UserRole.STUDENT) && <StudentActions />}
            {user.roles.includes(UserRole.PARENT) && <ParentActions />}
            {user.roles.includes(UserRole.TUTOR) && <TutorActions />}
        </div>
    )
}

export function ProfilePlaceholder() {
    return (
        <div>
            <h1>Loading...</h1>
        </div>
    )
}

function StudentActions() {
    return (
        <div>
            <button>Save as child</button>
            <button>Teach</button>
            <button>Connect</button>
        </div>
    )
}

function ParentActions() {
    return (
        <div>
            <button>Save as parent</button>
            <button>Message</button>
            <button>Connect</button>
        </div>
    )
}

function TutorActions() {
    return (
        <div>
            <button>Book Tutor</button>
            <button>Connect</button>
        </div>
    )
}
