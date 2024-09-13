'use client'

import { getUsersByUsername } from '@/actions/user'
import Icon from '@/components/Icon'
import { User } from '@/lib/definitions'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useEffect, useState } from 'react'

import styles from '@/components/Search.module.css'

export default function Search({inMenu}: {
    inMenu?: boolean,
}) {
    const [users, setUsers] = useState<User[] | null>(null)
    const [query, setQuery] = useState('')
    const router = useRouter()

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    }

    const handleSubmit = () => {
        router.push(`/connect?query=${query}`)
        setQuery('')
    }

    useEffect(() => {
        if (!query) {
            setUsers(null)
            return
        }
        getUsersByUsername(query)
            .then(({ data, error }) => {
                if (error) throw new Error(error)
                setUsers(data!)
            })
            .catch(() => setUsers(null))
    }, [query])

    return (
        <div className={`relative flex-1 h-fit max-w-96 ${styles.search}`}>
            <div className={`flex items-stretch h-12`}>
                <input
                    placeholder='Find someone you know'
                    className="flex-1 p-2 outline-none rounded-l border border-neutral-200 focus:border-neutral-400"
                    value={query} onChange={handleInput}
                />
                <button onClick={handleSubmit} className='bg-neutral-600 p-2 text-white rounded-r'><Icon icon='search' /></button>
            </div>
            {users && (
                <div className={`${styles.users} absolute top-full ${inMenu ? 'bg-white' : 'bg-white/95'} backdrop-blur left-0 right-0 flex flex-col rounded-b border border-neutral-200`}>
                    {users.slice(0, 5).map((user, i) => (
                        <Link key={i} href={`/profile/${user.username}`} className='w-full p-2'>{user.username}</Link>
                    ))}
                    {users.length > 5 || true && (
                        <Link href={`/connect?query=${query}`} onClick={handleSubmit} className='text-blue-700 underline text-center w-full p-2'>See all results</Link>
                    )}
                </div>
            )}
        </div>
    )
}