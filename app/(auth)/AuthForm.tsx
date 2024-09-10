export default function AuthForm({ name, action, error, children, switchLabel, switchLink }: {
    name: string,
    action?: (formData: FormData) => void,
    error?: string,
    children: React.ReactNode,
    switchLabel: string,
    switchLink: React.ReactNode,
}) {
    return (
        <form action={action} className='flex flex-col gap-2 w-full h-full form:w-96 form:h-auto form:my-5 mx-auto max-w-full px-2 py-5 bg-white form:shadow form:rounded-lg'>
            <h1 className='text-xl my-2 font-medium text-center'>{name.toUpperCase()}</h1>
            {children}
            <button type='submit' className='bg-blue-500 w-40 text-white font-medium px-5 py-2 rounded mt-5 m-auto'>{name}</button>
            <p className='text-neutral-500 text-center'>{switchLabel} <span className='text-blue-500 underline'>{switchLink}</span></p>
            {error && <p className='text-red-500'>{error}</p>}
        </form>
    )
}