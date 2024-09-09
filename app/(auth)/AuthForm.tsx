export default function AuthForm({ name, action, error, children }: {
    name: string,
    action?: (formData: FormData) => void,
    error?: string,
    children: React.ReactNode,
}) {
    return (
        <form action={action}>
            {children}
            <button type='submit'>{name}</button>
            {error && <p className='text-red-500'>{error}</p>}
        </form>
    )
}