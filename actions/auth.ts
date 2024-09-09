'use server'

import { LoginFormState, SignupFormState, LoginSchema, SignupSchema, UserRole } from '@/lib/definitions'
import supabase from '@/actions/supabase'
import { createSession } from '@/actions/session'


export async function login(state: LoginFormState | undefined, formData: FormData): Promise<LoginFormState> {
    const validatedFields = LoginSchema.safeParse({
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const { email, password } = validatedFields.data
    try {
        const db = await supabase()
        const { data, error } = await db.auth.signInWithPassword({ email, password })
        if (error) return { serverError: error.message }

        createSession(data?.user.id)
        return { message: 'Success' }
    } catch {
        return { serverError: 'Something went wrong.' }
    }
}

export async function signup(state: SignupFormState | undefined, formData: FormData): Promise<SignupFormState> {
    // TODO generate random username if empty

    const validatedFields = SignupSchema.safeParse({
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        confirm: formData.get('confirm') as string,
        username: formData.get('username') as string,
        roles: Object.values(UserRole).filter(role => formData.has(role)),
        first: formData.get('first') as string,
        last: formData.get('last') as string,
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const { email, password, username, first, last, roles } = validatedFields.data
    try {
        const db = await supabase()
        const { data, error: signupError } = await db.auth.signUp({ email, password })
        if (signupError) return { serverError: signupError.message }
        if (!data.user) return { serverError: 'Something went wrong.' }

        const { error: profileError } = await db.from('profiles')
            .insert([{
                username,
                roles,
                first_name: first,
                last_name: last,
            }])
        if (profileError) return { serverError: profileError.message }

        createSession(data.user.id)
        return { message: 'Success' }
    } catch {
        return { serverError: 'Something went wrong.' }
    }
}