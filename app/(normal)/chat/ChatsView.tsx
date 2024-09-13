'use client'

import { useContext, useEffect, useState } from 'react'
import { Context } from '@/app/(normal)/chat/utils/context'
import { User } from '@/lib/definitions'
import ChatPreview from '@/components/ChatPreview'

export default function ChatsView({ getUser }: {
    getUser: (id: string) => Promise<{ data?: User, error?: string }>
}) {
    const { sessionUser, messages } = useContext(Context)
    const [chatIds, setChatIds] = useState<string[]>([])
    const [chats, setChats] = useState<{ [key: string]: User }>({})

    useEffect(() => {
        const _chatIds: string[] = []
        if (messages) {
            for (const message of messages) {
                if (!_chatIds.includes(message.sent_by)) _chatIds.push(message.sent_by)
                if (!_chatIds.includes(message.sent_to)) _chatIds.push(message.sent_to)
            }
            setChatIds(_chatIds.filter(id => id !== sessionUser?.user_id))
        }
    }, [messages])

    useEffect(() => {
        for (const userId of chatIds) {
            if (chats[userId]) return
            getUser(userId)
                .then(({ data: user, error }) => {
                    if (error) return console.error(error)
                    const update: { [key: string]: User } = {}
                    update[userId] = user!
                    setChats(prev => ({ ...prev, ...update }))
                })
        }
    }, [chatIds])

    return <ul className=''>
        {chatIds?.map((id, i) => (
            <li key={i}>
                <ChatPreview user={chats[id]} />
            </li>
        ))}
    </ul>
}