'use client'

import Link from 'next/link'
import FormInput from '@/components/FormInput'
import AuthForm from '@/components/AuthForm'
import { signup } from '@/actions/auth'
import { useFormState } from 'react-dom'
import { UserRole } from '@/lib/definitions'

export default function Page({searchParams}: {
    searchParams: URLSearchParams
}) {
    const [state, action] = useFormState(signup, undefined)

    return (
        <AuthForm
            name='Sign Up'
            action={action} error={state?.serverError}
            success={state?.message}
            switchLabel='Already have an account?'
            switchLink={<Link href='/login'>Login</Link>}
            redirectUrl={searchParams.get('redirect')}
        >
            <FormInput label='Email' placeholder='name@example.com' type='email' name='email' required state={state} />
            <FormInput label='Password' placeholder='*****' type='password' name='password' required state={state} />
            <FormInput label='Confirm Password' placeholder='*****' type='password' name='confirm' required state={state} />
            <FormInput label='Username' placeholder='Username' name='username' required state={state} />
            <FormInput label='First Name' placeholder='First name' name='first' state={state} />
            <FormInput label='Last Name' placeholder='Last name' name='last' state={state} />
            <h3 className='mt-2 font-medium text-center'>Which role best describes you?</h3>
            <div>
                {Object.values(UserRole).map(role => (
                    <div key={role} className='flex w-full justify-center'>
                        <label className='w-48' htmlFor={role}>{role}</label>
                        <input type='checkbox' name={role} />
                    </div>
                ))}
            </div>
        </AuthForm>
    )
}