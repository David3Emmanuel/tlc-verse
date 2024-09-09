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
    return (<>
        <div className='flex'>
            {label && (
                <label className='p-2 w-40' htmlFor={name}>{label}{required ? ' *' : ''}</label>
            )}
            <input
                placeholder={placeholder}
                type={type}
                name={name}
                required={required}
                className='p-2 w-48'
            />
        </div>
        {state?.errors?.[name]?.map(
            (error, i) => <p key={i} className='text-red-500'>{error}</p>
        )}
    </>)
}