import { User, UserRole } from '@/lib/definitions'

export const users: User[] = [
    {
        username: 'David3Emmanuel',
        roles: [UserRole.ADMIN, UserRole.STUDENT, UserRole.TUTOR],
        firstName: 'David',
        lastName: 'Emmanuel',
    },
    {
        username:'Emmy',
        roles: [UserRole.STUDENT],
        firstName: 'Peace',
        lastName: 'Emmanuel',
    },
]