export default function FormInput({ placeholder, type, name, required, label, state }: {
    placeholder?: string,
    type?: React.HTMLInputTypeAttribute,
    name: string,
    required?: boolean,
    label?: string,
    state?: {
        errors?: {
            [key: string]: string[],
        },
    },
}) {
    // TODO show/hide password

    return (<>
        <div className='flex max-w-full justify-center gap-2'>
            {label && (
                <label className='p-2 text-md text-left w-48' htmlFor={name}>{label}<span className='text-[#ff0000]'>{required ? ' *' : ''}</span></label>
            )}
            <input
                placeholder={placeholder}
                type={type}
                name={name}
                required={required}
                className='p-2 flex-1 max-w-56 border border-neutral-200 focus:border-neutral-400 rounded'
            />
        </div>
        {state?.errors?.[name]?.map(
            (error, i) => <p key={i} className='text-sm text-red-500'>{error}</p>
        )}
    </>)
}