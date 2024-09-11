'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Tabs({ tabs }: {
    tabs: {
        [key: string]: {
            name: string,
            content: React.ReactNode
        },
    },
}) {
    const tabNames = Object.keys(tabs)
    const [currentTab, setCurrentTab] = useState(tabNames[0])

    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        const tab = searchParams.get('tab')
        setCurrentTab((tab && tabNames.includes(tab)) ? tab : tabNames[0])
    }, [searchParams])

    return (<div className='flex-1 flex flex-col sm:bg-white sm:card px-5 sm:px-6 no-hover'>
        <div className='flex gap-5'>
            {tabNames.map((name, i) => <Link className={`text-neutral-700 text-xl ${currentTab === name ? 'border-b-2 border-neutral-500' : 'hover:border-b-2 hover:border-neutral-300'}`} href={`${pathname}/?tab=${name}`} key={i}>{tabs[name].name}</Link>)}
        </div>
        <div className='flex-1'>
            {tabs[currentTab].content}
        </div>
    </div>)
}