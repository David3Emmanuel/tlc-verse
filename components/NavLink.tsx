'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

import menuStyles from '@/components/Menu.module.css'

export default function NavLink({ href, children }: {
    href: string,
    children: React.ReactNode,
}) {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const active = pathname === '/connect' && searchParams.get('role') === 'tutor'
        ? href === '/connect?role=tutor'
        : pathname === href

    return (
        <li className='flex-1 hidden md:block'>
            <Link href={href} className={`flex items-center p-2 w-full h-full justify-center font-medium text-center rounded ${active ? '' : 'hover:bg-neutral-100'} ${active ? 'bg-neutral-300 ' + menuStyles.active : ''}`}>
                {children}
            </Link>
        </li>
    )
}