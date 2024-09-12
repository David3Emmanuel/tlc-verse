import Link from 'next/link'

export default function GetStarted() {
    return (
        <div className='h-full flex items-center'>
            <Link href='/signup' className='button w-full px-2'>
                Get Started
            </Link>
        </div >
    )
}