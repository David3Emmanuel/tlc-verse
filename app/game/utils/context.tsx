'use client'

import { getCurrentUser } from '@/actions/user'
import { SessionUser } from '@/lib/definitions'
import { createContext, useEffect, useState } from 'react'


export interface Context {
    currentUser?: SessionUser
}

export const Context = createContext<Context>({})

export function ContextProvider({ children }: {
    children: React.ReactNode,
}) {
    const [currentUser, setCurrentUser] = useState<SessionUser | undefined>(undefined)
    useEffect(() => {
        getCurrentUser()
            .then(({ data, error }) => {
                if (error) throw new Error(error)
                setCurrentUser(data!)
            })
    }, [])

    return (
        <Context.Provider value={{
            currentUser,
        }}>
            {children}
        </Context.Provider>
    )
}