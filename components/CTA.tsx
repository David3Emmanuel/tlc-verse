import { Suspense } from 'react'
import Avatar from '@/components/Avatar'

export default function CTA({ label, underline }: {
    label?: string,
    underline?: boolean,
}) {
    return (
        <Suspense fallback={<div className='w-12 h-12 rounded-full bg-neutral-200' />}>
            <Avatar label={label} underline={underline} />
        </Suspense>
    )
}
