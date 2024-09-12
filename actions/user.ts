'use server'

import { User, UserRole, SessionUser } from '@/lib/definitions'
import supabase from '@/actions/supabase'
import { createSession, getSession, updateSession } from '@/actions/session'
import { cache } from 'react'
import { redirect } from 'next/navigation'

export const getUsers = cache(
    async function (): Promise<{ data?: User[], error?: string }> {
        const db = await supabase()
        const { data, error } = await db.from('profiles').select('*')
        if (error) return { error: error.message }

        return { data }
    }
)

export const getUsersByRoles = cache(
    async function (roles: UserRole[]): Promise<{ data?: User[], error?: string }> {
        const db = await supabase()
        const { data, error } = await db.from('profiles')
            .select('*')
            .overlaps('roles', roles)
        if (error) return { error: error.message }

        return { data }
    }
)

export const getUsersByUsername = cache(
    async function (query: string): Promise<{ data?: User[], error?: string }> {
        // TODO search full name as well

        const db = await supabase()
        const { data, error } = await db.from('profiles')
            .select('*')
            .ilike('username', `%${query}%`)
        if (error) return { error: error.message }

        return { data }
    }
)

export const getUsersByUsernameAndRoles = cache(
    async function (query: string, roles: UserRole[]): Promise<{ data?: User[], error?: string }> {
        const db = await supabase()
        const { data, error } = await db.from('profiles')
            .select('*')
            .ilike('username', `%${query}%`)
            .overlaps('roles', roles)
        if (error) return { error: error.message }

        return { data }
    }
)

export const getUserByUsername = cache(
    async (username: string): Promise<{ data?: User, error?: string }> => {
        const db = await supabase()
        const { data, error } = await db.from('profiles')
            .select('*')
            .eq('username', username)
        if (error) return { error: error.message }

        return { data: data?.[0] }
    }
)

export const getUserById = cache(
    async (id: string): Promise<{ data?: User, error?: string }> => {
        const db = await supabase()
        const { data, error } = await db.from('profiles')
            .select('*')
            .eq('user_id', id)
        if (error) return { error: error.message }

        return { data: data?.[0] }
    }
)

export const getCurrentUser = cache(
    async (): Promise<{ data?: SessionUser, error?: string }> => {
        const session = await getSession()
        if (!session) return { error: 'No session' }

        return {
            data: {
                username: session.username,
                user_id: session.userId,
            }
        }
    }
)

export async function updateProfile(formData: FormData): Promise<{ error?: string }> {
    const image = formData.get('image') as File
    const bio = formData.get('bio') as string
    const roles = Object.values(UserRole).filter(role => formData.has(role))

    const update = { bio, roles } as { bio: string, roles: UserRole[], profile_pic: string }

    const { data: currentSessionUser, error: sessionError } = await getCurrentUser()
    if (sessionError) return { error: sessionError }

    const db = await supabase()

    if (image.size) {
        const { error: uploadError } = await db.storage.from('profile_pics')
            .upload(currentSessionUser!.user_id, image, { upsert: true })
        if (uploadError) {
            console.error(uploadError)
            return { error: uploadError.message }
        }

        const { data } = db.storage.from('profile_pics')
            .getPublicUrl(currentSessionUser!.user_id)
        update.profile_pic = data.publicUrl
    }

    const { error: updateError } = await db.from('profiles')
        .update(update)
        .eq('user_id', currentSessionUser?.user_id)
    if (updateError) {
        console.error(updateError)
        return { error: updateError.message }
    }

    redirect(`/profile/${currentSessionUser?.username}`)
}
