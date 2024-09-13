'use client'

import { sendMessage } from '@/actions/chat'
import { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'

export default function SendMessage({ userId }: { userId: string }) {
    const [state, action] = useFormState(sendMessage, undefined)
    const [message, setMessage] = useState('')

    useEffect(() => {
        if (state?.message === 'sent') setMessage('')
    }, [state])

    return (<>
        <form className='flex drop-shadow gap-2 p-2 w-full' action={action}>
            <input type='hidden' name='user_id' value={userId} />
            <input
                type='text' name='message'
                className='flex-1 sm:min-w-[24rem] border border-neutral-300 rounded-lg p-2'
                value={message} onChange={e => setMessage(e.target.value)}
            />
            <button type='submit' className='w-fit'><span className='material-icons text-blue-500'>send</span></button>
        </form>
    </>)
}