'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NavLink({ href, children }: {
    href: string,
    children: React.ReactNode,
}) {
    const pathname = usePathname()
    const active = pathname === href

    return <Link href={href} className={`block p-2 ${active?'bg-neutral-300':''}`}>{children}</Link>
}