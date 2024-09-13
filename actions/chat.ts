'use server'

import { Message, MessageFormState } from '@/lib/definitions'
import supabase from '@/actions/supabase'
import { getCurrentUser } from '@/actions/user'

export async function getMessages(user_id: string): Promise<{ data?: Message[], error?: string }> {
    const db = await supabase()
    const { data, error } = await db.from('messages')
        .select('*')
        .or(`sent_by.eq.${user_id},sent_to.eq.${user_id}`)
        .order('sent_at', { ascending: true })
    if (error) return { error: error.message }

    return { data }
}

export async function sendMessage(formState: MessageFormState | undefined, formData: FormData): Promise<MessageFormState> {
    const message = formData.get('message') as string
    if (!message) return { serverError: 'Message is required.' }
    const user_id = formData.get('user_id') as string

    const { data: sessionUser, error: sessionError } = await getCurrentUser()
    if (sessionError) return { serverError: sessionError }

    const db = await supabase()
    const { error } = await db.from('messages')
        .insert({ sent_by: sessionUser!.user_id, sent_to: user_id, message })
    if (error) return { serverError: error.message }

    return { message: 'sent' }
}
