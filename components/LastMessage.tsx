'use client'

import { useContext, useEffect, useState } from 'react'
import { Context } from '@/app/(normal)/chat/utils/context'
import { User, Message } from '@/lib/definitions'

export default function LastMessage({ user }: { user: User }) {
    const { messages } = useContext(Context)
    const [lastMessage, setLastMessage] = useState<Message | undefined>(undefined)

    useEffect(() => {
        if (!messages) return
        const _lastMessage = messages?.toReversed().find(message => [message.sent_by, message.sent_to].includes(user.user_id))
        setLastMessage(_lastMessage)
    }, [messages, user])

    if (!lastMessage) return

    return (
        <p className='text-neutral-700'>{lastMessage.sent_by !== user.user_id && <span className='text-black'>You: </span>}{lastMessage.message}</p>
    )
}