'use client'

export default function Icon({ icon, onClick, color, fontSize }: {
    icon: string,
    onClick?: () => void,
    color?: string,
    fontSize?: string,
}) {
    return (
        <div onClick={onClick} className={`${onClick ? 'cursor-default' : ''} h-full aspect-square flex justify-center items-center ${color || ''}`}>
            <div className='w-1/2 aspect-square flex justify-center items-center'>
                <span className={`material-icons ${fontSize || ''}`}>{icon}</span>
            </div>
        </div>
    )
}