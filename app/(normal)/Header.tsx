import Link from 'next/link'
import NavLink from '@/components/NavLink'
import Search from '@/components/Search'
import Menu from '@/components/Menu'
import CTA from '@/components/CTA'
import { Suspense } from 'react'
import { deleteSession } from '@/actions/session'
import { getCurrentUser } from '@/actions/user'

export default async function Header() {
    const { data: currentUser } = await getCurrentUser()
    
    return (
        <header className='flex md:flex-col lg:flex-row justify-between items-stretch bg-white p-2 gap-y-2'>
            <div className='flex flex-1 gap-2 justify-between items-center'>
                <Link href='/' className='text-xl font-medium p-2 flex items-center'>TLCverse</Link>
                <div className='hidden md:flex flex-1 justify-center'><Search /></div>
                <div className='hidden md:flex px-2 lg:hidden items-stretch'>
                    <CTA label='Your Profile' />
                </div>
            </div>
            <Suspense>
                <ul className='flex-1 flex justify-end items-stretch gap-1'>
                    <NavLink href='/connect?role=tutor'>Find a Tutor</NavLink>
                    <NavLink href='/connect'>Connect</NavLink>
                    <NavLink href='/game'>Multiplayer</NavLink>
                    <NavLink href='/about'>About</NavLink>
                    <li className='flex-1 justify-end md:justify-center flex md:hidden lg:hidden items-stretch'>
                        <CTA />
                    </li>
                    <li className='flex-1 justify-end md:justify-center flex hidden lg:flex items-stretch'>
                        <CTA label='Your Profile' />
                    </li>
                    <li className='flex md:hidden w-12 justify-center items-stretch'>
                        <Menu
                            cta={<CTA label='Your Profile' underline />}
                            deleteSession={deleteSession}
                            currentUser={currentUser}
                        />
                    </li>
                </ul>
            </Suspense>
        </header>
    )
}