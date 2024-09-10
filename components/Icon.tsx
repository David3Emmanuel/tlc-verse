'use client'

export default function Icon({ icon, onClick, color, fitWidth }: {
    icon: string,
    onClick?: () => void,
    color?: string,
    fitWidth?: boolean,
}) {
    return (
        <div onClick={onClick} className={`${onClick ? 'cursor-default' : ''} ${fitWidth ? '' : 'w-12'} h-full aspect-square flex justify-center items-center ${color}`}>
            <span className='material-symbols-outlined'>{icon}</span>
        </div>
    )
}