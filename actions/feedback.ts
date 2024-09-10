'use server'

import { redirect } from 'next/navigation'
import supabase from '@/actions/supabase'
import { getSession } from '@/actions/session'

export async function submitFeedback(formData: FormData) {
    const feedback = formData.get('feedback') as string
    const rating = parseInt(formData.get('rating') as string)
    try {
        const session = await getSession()
        const user_id = session?.userId
        const db = await supabase()
        const { error: feedbackError } = await db.from('feedback')
            .insert([{ user_id, feedback, rating }])
        if (feedbackError) return { serverError: feedbackError.message }
    } catch (e) {
        return { serverError: 'Something went wrong.' }
    } finally {
        // TODO toast thank you for your feedback
        redirect('/')
    }
}