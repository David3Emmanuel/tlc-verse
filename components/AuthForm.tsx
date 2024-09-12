import { redirect, useSearchParams } from 'next/navigation'

export default function AuthForm({ name, action, error, success, children, switchLabel, switchLink }: {
    name: string,
    action?: (formData: FormData) => void,
    error?: string,
    success?: string,
    children: React.ReactNode,
    switchLabel: string,
    switchLink: React.ReactNode,
}) {
    const searchParams = useSearchParams()
    if (success) redirect(searchParams.get('redirect') || '/')

    return (
        <form action={action} className='form'>
            <h1 className='text-xl my-2 font-medium text-center'>{name.toUpperCase()}</h1>
            {children}
            <button type='submit' className='button mt-5'>{name}</button>
            <p className='text-neutral-500 text-center'>{switchLabel} <span className='text-blue-500 underline'>{switchLink}</span></p>
            {error && <p className='text-red-500'>{error}</p>}
        </form>
    )
}