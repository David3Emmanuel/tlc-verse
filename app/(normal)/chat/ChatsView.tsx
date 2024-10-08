'use client'

import { useContext, useEffect, useState } from 'react'
import { Context } from '@/app/(normal)/chat/utils/context'
import { User } from '@/lib/definitions'
import ChatPreview from '@/components/ChatPreview'

export default function ChatsView({ getUser, split }: {
    getUser: (id: string) => Promise<{ data?: User, error?: string }>,
    split?: boolean,
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
    }, [messages, sessionUser])

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
    }, [chats, chatIds, getUser])

    return <ul className='py-3'>
        {chatIds?.map((id, i) => (
            <li key={i} className='flex justify-center py-2'>
                <ChatPreview user={chats[id]} split={split} />
            </li>
        ))}
    </ul>
}