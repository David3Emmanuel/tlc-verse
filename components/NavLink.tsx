'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

import menuStyles from '@/components/Menu.module.css'

export default function NavLink({ href, cta, children }: {
    href: string,
    cta?: boolean,
    children: React.ReactNode,
}) {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const active = pathname === '/connect' && searchParams.get('role') === 'tutor'
        ? href === '/connect?role=tutor'
        : pathname === href

    return (
        <li className={`flex-1 ${cta ? 'block' : 'hidden md:block'}`}>
            <Link href={href} className={`flex items-center p-2 w-full h-full justify-center font-medium rounded ${active || cta ? '' : 'hover:bg-neutral-100'} ${active && !cta ? 'bg-neutral-300 ' + menuStyles.active : ''} ${cta ? 'bg-[#ff0000] hover:bg-[#ee0000] text-white' : ''}`}>
                {children}
            </Link>
        </li>
    )
}