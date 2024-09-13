'use client'

import { Message, SessionUser } from '@/lib/definitions'
import { createContext } from 'react'
import { useChat } from './hooks'


export interface Context {
    messages?: Message[]
    sessionUser?: SessionUser
}

export const Context = createContext<Context>({})

export function ContextProvider({ children, sessionUser, serverMessages }: {
    children: React.ReactNode,
    serverMessages?: Message[],
    sessionUser: SessionUser,
}) {
    const messages = useChat(sessionUser, serverMessages)

    return (
        <Context.Provider value={{ messages, sessionUser }}>
            {children}
        </Context.Provider>
    )
}