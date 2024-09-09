'use client'

import Search from '@/components/Search'
import Icon from '@/components/Icon'
import { MouseEvent, useState } from 'react'
import Link from 'next/link'
import NavLink from '@/components/NavLink'
import CTA from '@/components/CTA'

import styles from '@/components/Menu.module.css'

export default function Menu() {
    const [open, setOpen] = useState(false)

    const handleClickOut = (e: MouseEvent) => {
        if (e.target === e.currentTarget) setOpen(false)
    }

    return (<>
        <Icon icon='menu' onClick={() => setOpen(true)} />
        <div onClick={handleClickOut} className={`${styles.menu} fixed top-0 backdrop-blur w-screen h-screen right-0 flex items-stretch justify-end transition-transform origin-right ${open ? 'scale-x-100' : 'scale-x-0'}`}>
            <div className={`z-10 max-w-screen w-96 bg-black/75 p-4`}>
                <div className='flex items-center h-12 pb-5'>
                    <Icon icon='close' color='text-white' onClick={() => setOpen(false)} />
                    <Link href='/' className='flex-1 text-3xl font-medium p-2 flex items-center justify-center text-white'>TLCverse</Link>
                </div>
                <Search menuClose={() => setOpen(false)} />
                <ul className='flex flex-col gap-2' onClick={() => setOpen(false)}>
                    <NavLink href='/connect?role=tutor'>Find a Tutor</NavLink>
                    <NavLink href='/connect'>Connect</NavLink>
                    <NavLink href='/multiplayer'>Multiplayer</NavLink>
                    <NavLink href='/about'>About</NavLink>
                    <div className='flex md:hidden lg:flex items-stretch'>
                        {/* <CTA /> */}
                        <p>.</p>
                    </div>
                </ul>
            </div>
        </div>
    </>)
}