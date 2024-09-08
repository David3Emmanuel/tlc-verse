import Link from 'next/link'
import NavLink from '@/app/NavLink'

export default function Header() {
    return (
        <header className='flex px-2'>
            <Link href='/' className='flex-1 p-2'>TLCverse</Link>
            <ul className='flex-1 flex justify-end'>
                <li><NavLink href='/connect?role=tutor'>Find a Tutor</NavLink></li>
                <li><NavLink href='/connect'>Connect</NavLink></li>
                <li><NavLink href='/multiplayer'>Multiplayer</NavLink></li>
                <li><NavLink href='/signup'>Get Started</NavLink></li>
            </ul>
        </header>
    )
}