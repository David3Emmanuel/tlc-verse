import Link from 'next/link'

export default function FeatureCard({ feature, link, children }: {
    feature: string,
    link: string,
    children?: React.ReactNode,
}) {
    return (
        <li>
            <Link href={link} className='px-2 py-5 bg-neutral-700 rounded-md shadow shadow-neutral-500/50 w-72 max-w-full h-full flex flex-col gap-2 transition-transform hover:scale-110'>
                <h3 className='font-2xl font-medium'>{feature}</h3>
                <div className='flex-1'>
                    {children}
                </div>
                <p className='text-center text-blue-300 underline'>Learn more</p>
            </Link>
        </li>
    )
}
