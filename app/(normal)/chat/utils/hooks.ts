'use client'

import { Message, SessionUser } from '@/lib/definitions'
import { useWatchDB } from '@/lib/realtime'
import { useEffect, useState } from 'react'

export function useChat(sessionUser: SessionUser, serverMessages?: Message[]) {
    const [messages, setMessages] = useState<Message[]|undefined>(serverMessages)
    const [messagesData, _] = useWatchDB<Message, string>('messages')

    useEffect(() => {
        if (!messagesData) return
        setMessages(messagesData.filter(
            message => [message.sent_by, message.sent_to].includes(sessionUser.user_id)
        ))
    }, [messagesData])

    return messages
}