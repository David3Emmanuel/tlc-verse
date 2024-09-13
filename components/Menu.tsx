'use client'

import Search from '@/components/Search'
import Icon from '@/components/Icon'
import { MouseEvent, useEffect, useState } from 'react'
import Link from 'next/link'
import NavLink from '@/components/NavLink'

import styles from '@/components/Menu.module.css'
import { usePathname, useSearchParams } from 'next/navigation'
import Logout from '@/app/(normal)/profile/[username]/Logout'
import { SessionUser } from '@/lib/definitions'

export default function Menu({ cta, deleteSession, currentUser }: {
    cta: React.ReactNode,
    deleteSession: () => void,
    currentUser?: SessionUser,
}) {
    const [open, setOpen] = useState(false)
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => () => setOpen(false), [pathname, searchParams])

    const handleClickOut = (e: MouseEvent) => {
        if (e.target === e.currentTarget) setOpen(false)
    }

    return (<>
        <Icon icon='menu' onClick={() => setOpen(true)} />
        <div onClick={handleClickOut} className={`${styles.menu} z-10 backdrop-blur fixed top-0 w-screen h-screen right-0 flex items-stretch justify-end transition-transform origin-right ${open ? 'scale-x-100' : 'scale-x-0'}`}>
            <div className={`w-96 min-[300px]:max-w-[75vw] max-[300px]:w-[90vw] bg-black bg-texture flex flex-col`}>
                <div className='flex items-center h-12 p-8'>
                    <Icon icon='close' color='text-white' onClick={() => setOpen(false)} />
                    <Link href='/' className='flex-1 text-3xl font-medium p-2 flex items-center justify-center text-white'>TLCverse</Link>
                </div>
                <div className='px-2'>
                    <Search inMenu />
                </div>
                <div className='text-white p-4 py-6 flex justify-center'>
                    {cta}
                </div>
                <h2 className='text-white text-center font-medium text-xl mt-5 mb-2'>Navigation Links</h2>
                <div className='bg-neutral-700 bg-texture p-2 flex-1'>
                    <ul className='flex flex-col gap-2 pl-5'>
                        <NavLink href='/chat'>Your Chats</NavLink>
                        <NavLink href='/connect?role=tutor'>Find a Tutor</NavLink>
                        <NavLink href='/connect'>Connect</NavLink>
                        <NavLink href='/game'>Multiplayer</NavLink>
                        <NavLink href='/about'>About</NavLink>
                        {currentUser && <Logout deleteSession={deleteSession} />}
                    </ul>
                </div>
            </div>
        </div>
    </>)
}