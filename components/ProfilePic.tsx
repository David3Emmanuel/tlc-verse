import Icon from '@/components/Icon'
import { User } from '@/lib/definitions'
import Image from 'next/image'

export default function ProfilePic({ user, src }: {
    user?: User,
    src?: string,
}) {
    const _src = user?.profile_pic || src
    if (!_src) return <ProfilePicDefault />
    return (
        <div className='m-auto flex w-24 h-24 sm:w-48 sm:h-48 border relative border-neutral-300/50 shadow rounded-full overflow-hidden'>
            <Image
                src={_src}
                alt={`${user?.username}'s profile picture`}
                fill priority sizes='12rem'
            />
        </div>
    )
}

export function ProfilePicPlaceholder() {
    return (
        <div className='m-auto flex w-24 h-24 sm:w-48 sm:h-48 bg-neutral-100 border border-neutral-300/50 shadow rounded-full' />
    )
}

function ProfilePicDefault() {
    return (
        <div className='m-auto flex w-24 h-24 sm:w-48 sm:h-48 bg-neutral-100 border border-neutral-300/50 shadow rounded-full'>
            <Icon icon='person' color='text-neutral-300' fontSize='text-6xl sm:text-9xl' />
        </div>
    )
}
