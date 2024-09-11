'use server'

import { User, UserRole, SessionUser } from '@/lib/definitions'
import supabase from '@/actions/supabase'
import { getSession } from '@/actions/session'
import { cache } from 'react'

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

export const getUser = cache(
    async (username: string): Promise<{ data?: User, error?: string }> => {
        const db = await supabase()
        const { data, error } = await db.from('profiles')
            .select('*')
            .eq('username', username)
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
