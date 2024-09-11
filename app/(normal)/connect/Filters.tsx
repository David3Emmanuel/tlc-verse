'use client'

import RoleSelect from '@/components/RoleSelect'
import { FiltersData, UserRole } from '@/lib/definitions'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Filters({ filters: initialFilters, submit }: {
    filters: FiltersData,
    submit: (filters: FiltersData) => void,
}) {
    const [filters, setFilters] = useState(initialFilters)
    const searchParams = useSearchParams()
    useEffect(() => {
        setFilters({
            roles: searchParams.get('role')?.split(',') as UserRole[] || [],
            query: searchParams.get('query') || '',
        })
    }, [searchParams])

    useEffect(() => {
        submit(filters)
    }, [filters])

    return (
        <div className='flex items-center justify-between'>
            <RoleSelect filters={filters} setFilters={setFilters} />
            <input
                placeholder='username' value={filters.query}
                className='p-2 flex-1 max-w-56 h-fit border border-neutral-200 focus:border-neutral-400 rounded'
                onChange={e => setFilters({ ...filters, query: e.target.value })}
            />
        </div>
    )
}
