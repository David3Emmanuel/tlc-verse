import { getUser } from '@/actions/user'
import { UserRole } from '@/lib/definitions'

export default async function Profile({ username }: {
    username: string,
}) {
    let user

    try {
        user = await getUser(username)
    } catch {
        return <div>Something went wrong.</div>
    }

    if (!user) {
        return <div>User not found</div>
    }

    return (
        <div>
            <h1>{user.first_name} {user.last_name}</h1>
            {user.roles.includes(UserRole.STUDENT) && <StudentActions />}
            {user.roles.includes(UserRole.PARENT) && <ParentActions />}
            {user.roles.includes(UserRole.TUTOR) && <TutorActions />}
        </div>
    )
}

function StudentActions() {
    return (
        <div>
            <button>Add as child</button>
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
