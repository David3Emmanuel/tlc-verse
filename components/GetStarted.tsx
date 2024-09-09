import Link from 'next/link'

export default function GetStarted() {
    return (
        <div className='h-full'>
            <Link href='/signup' className='flex items-center p-2 w-full h-full justify-center font-medium rounded bg-[#ff0000] hover:bg-[#ee0000] text-white'>
                Get Started
            </Link>
        </div >
    )
}