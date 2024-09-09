'use server'

import { UserRole } from '@/lib/definitions'
import { users } from '@/lib/dummy'

export function getUsers() {
    return users
}

export function getStudents() {
    return users.filter(user => user.roles.includes(UserRole.STUDENT))
}

export function getParents() {
    return users.filter(user => user.roles.includes(UserRole.PARENT))
}

export function getTutors() {
    return users.filter(user => user.roles.includes(UserRole.TUTOR))
}
