'use server'

import { User, UserRole } from '@/lib/definitions'
import supabase from '@/actions/supabase'

export async function getUsers(): Promise<User[]> {
    const db = await supabase()
    const { data, error } = await db.from('profiles').select('*')
    if (error) throw error

    return data
}

export async function getUsersWithFilter(roles: UserRole[]): Promise<User[]> {
    const db = await supabase()
    const { data, error } = await db.from('profiles')
        .select('*')
        .overlaps('roles', roles)
    if (error) throw error

    return data
}

export async function getUser(username: string) {
    const db = await supabase()
    const { data, error } = await db.from('profiles')
        .select('*')
        .eq('username', username)
    if (error) throw error

    return data?.[0]
}
