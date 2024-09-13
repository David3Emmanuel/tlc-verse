import { Metadata } from 'next'
import { ContextProvider } from './utils/context'
import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/actions/user'
import { getMessages } from '@/actions/chat'

export const metadata: Metadata = {
    title: {
        template: '%s | Chat',
        default: 'Chat',
    },
    description: 'Your messages',
}

export default async function ChatLayout({ children }: {
    children: React.ReactNode
}) {
    const { data: sessionUser, error: sessionError } = await getCurrentUser()
    if (sessionError) redirect('/login')

    const {data: messages, error: getMessagesError} = await getMessages(sessionUser!.user_id)
    if (getMessagesError) {
        console.error(getMessagesError)
        return <div>Could not load messages. Try refreshing the page</div>
    }

    return (
        <ContextProvider serverMessages={messages} sessionUser={sessionUser!}>
            {children}
        </ContextProvider>
    )
}
