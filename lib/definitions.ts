export interface User {
    username: string,
    firstName?: string,
    lastName?: string,
    roles: UserRole[],
}

export enum UserRole {
    STUDENT = 'student',
    TUTOR = 'tutor',
    PARENT = 'parent',
    ADMIN = 'admin',
}
