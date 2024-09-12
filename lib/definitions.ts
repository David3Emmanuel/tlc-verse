import { z } from 'zod'

export interface User {
    user_id: string
    username: string
    first_name?: string
    last_name?: string
    roles: UserRole[]
    bio: string
    profile_pic?: string
}

export type Session = {
    userId: string
    username: string
    expires: Date
}

export interface SessionUser {
    user_id: string
    username: string
}

export enum UserRole {
    STUDENT = 'student',
    TUTOR = 'tutor',
    PARENT = 'parent',
}

export const LoginSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email address' }).trim(),
    password: z.string(),
})

export interface LoginFormState {
    errors?: {
        email?: string[]
        password?: string[]
    }
    message?: string
    serverError?: string
}

export const SignupSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email address' }).trim(),
    password: z.string()
        .min(6, { message: 'Password must be at least 6 characters long' })
        .regex(/^[^\s]*$/, { message: 'Password cannot contain spaces' })
        .trim(),
    confirm: z.string(),
    username: z.string()
        .min(4, { message: 'Username must be at least 4 characters long' })
        .max(20, { message: 'Username must be at most 20 characters long' })
        .regex(/^[^\s]*$/, { message: 'Username cannot contain spaces' })
        .trim(),
    roles: z.nativeEnum(UserRole).array(),
    first: z.string().trim().optional(),
    last: z.string().trim().optional(),
})
    .refine(data => data.password === data.confirm, { message: 'Passwords do not match', path: ['confirm'] })

export interface SignupFormState {
    errors?: {
        email?: string[]
        password?: string[]
        confirm?: string[]
        username?: string[]
        roles?: string[]
        first?: string[]
        last?: string[]
    }
    message?: string
    serverError?: string
}

export interface FiltersData {
    roles?: UserRole[]
    query?: string
}

interface InsertPayload<T extends { id: ID }, ID> {
    eventType: 'INSERT'
    old: {}
    new: T
}

interface UpdatePayload<T extends { id: ID }, ID> {
    eventType: 'UPDATE'
    old: { id: ID }
    new: T
}

interface DeletePayload<T extends { id: ID }, ID> {
    eventType: 'DELETE'
    old: { id: ID }
    new: {}
}

export type WatchDBPayload<T extends { id: ID }, ID> =
    InsertPayload<T, ID> |
    UpdatePayload<T, ID> |
    DeletePayload<T, ID>

export interface Game {
    id: string
    completed: boolean
    player1_score: number
    player2_score: number
    player1: string
    player2: string
    started_at: Date
}

export interface Question {
    id: number
    question: string
    options: string[]
    correct_option_index: number
}
