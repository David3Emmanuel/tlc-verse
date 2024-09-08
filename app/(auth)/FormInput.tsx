export default function FormInput({ placeholder, type, name, required, label }: {
    placeholder?: string,
    type?: React.HTMLInputTypeAttribute,
    name: string,
    required?: boolean,
    label?: string,
}) {
    return (
        <div className='flex'>
            {label && (
                <label className='p-2 w-40' htmlFor={name}>{label}{required?' *':''}</label>
            )}
            <input
                placeholder={placeholder}
                type={type}
                name={name}
                required={required}
                className='p-2 w-48'
            />
        </div>
    )
}