import Link from 'next/link'

export default function FeatureCard({ feature, link, children }: {
    feature: string,
    link: string,
    children?: React.ReactNode,
}) {
    return (
        <li>
            <Link href={link} className='card bg-neutral-700 w-72 max-w-full h-full'>
                <h3 className='font-2xl font-medium'>{feature}</h3>
                <div className='flex-1'>
                    {children}
                </div>
                <p className='text-center text-blue-300 underline'>Learn more</p>
            </Link>
        </li>
    )
}
