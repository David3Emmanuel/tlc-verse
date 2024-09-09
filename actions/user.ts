'use server'

import { User, UserRole } from '@/lib/definitions'
import supabase from '@/actions/supabase'

export async function getUsers() {
    const db = await supabase()
    const { data, error } = await db.from('profiles').select('*')
    if (error) throw error

    return data as User[]
}

export async function getUsersByRoles(roles: UserRole[]) {
    const db = await supabase()
    const { data, error } = await db.from('profiles')
        .select('*')
        .overlaps('roles', roles)
    if (error) throw error

    return data as User[]
}

export async function getUsersByUsername(query: string) {
    // TODO search full name as well

    const db = await supabase()
    const { data, error } = await db.from('profiles')
        .select('*')
        .ilike('username', `%${query}%`)
    if (error) throw error

    return data as User[]
}

export async function getUsersByUsernameAndRoles(query: string, roles: UserRole[]) {
    const db = await supabase()
    const { data, error } = await db.from('profiles')
        .select('*')
        .ilike('username', `%${query}%`)
        .overlaps('roles', roles)
    if (error) throw error

    return data as User[]
}

export async function getUser(username: string) {
    const db = await supabase()
    const { data, error } = await db.from('profiles')
        .select('*')
        .eq('username', username)
    if (error) throw error

    return data?.[0] as User | undefined
}
