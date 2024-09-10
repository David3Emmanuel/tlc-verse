'use client'

export default function Icon({ icon, onClick, color }: {
    icon: string,
    onClick?: () => void,
    color?: string,
}) {
    return (
        <div onClick={onClick} className={`${onClick ? 'cursor-default' : ''} w-12 h-full aspect-square flex justify-center items-center ${color}`}>
            <span className='material-symbols-outlined'>{icon}</span>
        </div>
    )
}