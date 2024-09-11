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
    const [currentTab, _setCurrentTab] = useState(tabNames[0])

    const pathname = usePathname()
    const searchParams = useSearchParams()

    const setCurrentTab = (tab: string | null) => {
        const newSearchParams = new URLSearchParams(searchParams.toString())
        if (tab && tabNames.includes(tab)) {
            newSearchParams.set('tab', tab)
            _setCurrentTab(tab)
        } else {
            newSearchParams.delete('tab')
            _setCurrentTab(tabNames[0])
        }
        window.history.replaceState(null, '', `?${newSearchParams.toString()}`)
    }

    useEffect(() => {
        const tab = searchParams.get('tab')
        setCurrentTab(tab)
    }, [searchParams])

    return (<div className='flex-1 flex flex-col sm:bg-white sm:card px-5 sm:px-6 no-hover'>
        <div className='flex gap-5'>
            {tabNames.map((name, i) => (
                <button
                    // href={`${pathname}?tab=${name}`} key={i}
                    onClick={() => setCurrentTab(name)} key={i}
                    className={`text-neutral-700 text-xl border-b-2 ${currentTab === name ? 'border-neutral-500' : 'border-transparent hover:border-neutral-300'}`}
                >
                    {tabs[name].name}
                </button>
            ))}
        </div>
        <div className='flex-1'>
            {tabs[currentTab].content}
        </div>
    </div>)
}