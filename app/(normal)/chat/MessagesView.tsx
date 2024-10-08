'use client'

import { Message, User } from '@/lib/definitions'
import { useContext } from 'react'
import { Context } from '@/app/(normal)/chat/utils/context'
import SendMessage from '@/app/(normal)/chat/SendMessage'
import Link from 'next/link'

export default function MessagesView({ user }: { user: User }) {
    const { messages: allMessages } = useContext(Context)
    const messages = allMessages?.filter(message => [message.sent_by, message.sent_to].includes(user.user_id))

    return (
        <div className='flex-1 card no-hover my-2 sm:my-5 px-0 py-5 pb-0 gap-0 bg-white bg-texture self-stretch'>
            <Link href={`/profile/${user.username}`} className='font-2xl text-center font-medium'>{user.username}</Link>
            <ul className='flex flex-col gap-2 flex-1 overflow-y-auto'>
                {messages?.map((message, i) => (
                    <MessageView key={i} message={message} user={user} />
                ))}
            </ul>
            <SendMessage userId={user.user_id} />
        </div>
    )
}

function MessageView({ message, user }: {
    message: Message,
    user: User,
}) {
    const received = message.sent_by === user.user_id
    const sentAt = new Date(message.sent_at)

    return (
        <li className={`flex px-2 ${received ? 'justify-start' : 'justify-end'}`}>
            <div className={`relative flex flex-col w-fit min-w-36 max-w-[75%] rounded-lg p-2 border ${received ? 'border-neutral-300 bg-neutral-50 text-black' : 'border-green-200 bg-green-500 text-white'}`}>
                <p className='break-words text-wrap'>{message.message}</p>
                <p className='bottom-1 right-1 text-[0.5rem] text-right'>{sentAt.toDateString()}</p>
            </div>
        </li>
    )
}