'use client'

import { useState } from 'react'
import Icon from '@/components/Icon'

export default function Rating({ name = 'rating' }: {
    name?: string,
}) {
    const [rating, setRating] = useState(1)

    return (
        <div className='flex gap-1'>
            {[1, 2, 3, 4, 5].map(i => (<>
                <input
                    type='radio'
                    key={i}
                    name={name}
                    value={i}
                    checked={rating === i}
                    onChange={e => setRating(parseInt(e.target.value))}
                    className='hidden'
                />
                <Icon
                    icon={rating >= i ? 'star' : 'star_border'}
                    color={rating >= i ? 'text-[#ff9900]' : 'text-neutral-400'}
                    onClick={() => setRating(i)}
                />
            </>))}
        </div>
    )
}