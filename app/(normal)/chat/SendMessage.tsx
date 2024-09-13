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
        <form className='flex gap-2 p-2' action={action}>
            <input type='hidden' name='user_id' value={userId} />
            <input
                type='text' name='message'
                className='flex-1 border border-neutral-300 rounded p-2'
                value={message} onChange={e => setMessage(e.target.value)}
            />
            <button className='button w-[5rem]' type='submit'>Send</button>
        </form>
    </>)
}