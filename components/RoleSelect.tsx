'use client'

import { FiltersData, UserRole } from '@/lib/definitions'
import Icon from '@/components/Icon'
import { useState } from 'react'

export default function RoleSelect({ filters, setFilters }: {
    filters: FiltersData,
    setFilters: (callback: (filters: FiltersData) => FiltersData) => void,
}) {
    const [showOptions, setShowOptions] = useState(false)

    return (
        <div className='relative w-32 rounded border p-2  bg-neutral-50'>
            <div className='flex items-center cursor-default' onClick={() => setShowOptions(prev => !prev)}>
                <p className='flex-1 text-center'>Roles</p>
                <Icon icon={showOptions ? 'unfold_less' : 'unfold_more'} fitWidth />
            </div>
            <div className={`left-0 right-0 rounded border p-2 absolute top-[calc(100%+5px)] bg-inherit flex flex-col gap-2 transition-transform origin-top ${showOptions ? 'scale-y-100' : 'scale-y-0'}`}>
                {Object.values(UserRole).map(role => (
                    <div key={role} className='flex w-full justify-center'>
                        <label className='w-48' htmlFor={role}>{role}</label>
                        <input
                            type='checkbox' name={role}
                            checked={filters.roles?.includes(role)}
                            onChange={e => {
                                setShowOptions(false)
                                setFilters(filters => {
                                    const newRoles = filters.roles ? [...filters.roles] : []
                                    if (e.target.checked) {
                                        if (!newRoles.includes(role)) newRoles.push(role)
                                        return { ...filters, roles: newRoles }
                                    }
                                    else {
                                        return { ...filters, roles: newRoles.filter(i => i !== role) }
                                    }
                                })
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}