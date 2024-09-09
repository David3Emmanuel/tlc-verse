import Link from 'next/link'
import NavLink from '@/components/NavLink'
import Search from '@/components/Search'
import Menu from '@/components/Menu'

export default function Header() {
    return (
        <header className='flex md:flex-col lg:flex-row justify-between items-stretch bg-white p-2 gap-y-2'>
            <div className='flex flex-1 gap-2 justify-between items-stretch'>
                <Link href='/' className='text-xl font-medium p-2 flex items-center'>TLCverse</Link>
                <div className='hidden md:flex flex-1 justify-center'><Search /></div>
                <div className='hidden md:flex lg:hidden items-stretch'>
                    <NavLink href='/signup' cta>Get Started</NavLink>
                </div>
            </div>
            <ul className='flex-1 flex justify-end items-stretch gap-1'>
                <NavLink href='/connect?role=tutor'>Find a Tutor</NavLink>
                <NavLink href='/connect'>Connect</NavLink>
                <NavLink href='/multiplayer'>Multiplayer</NavLink>
                <NavLink href='/about'>About</NavLink>
                <div className='flex md:hidden lg:flex items-stretch'>
                    <NavLink href='/signup' cta>Get Started</NavLink>
                </div>
                <div className='flex md:hidden w-12 justify-center items-stretch'>
                    <Menu />
                </div>
            </ul>
        </header>
    )
}