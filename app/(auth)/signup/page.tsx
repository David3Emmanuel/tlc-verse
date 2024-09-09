'use client'

import Link from 'next/link'
import FormInput from '@/app/(auth)/FormInput'
import AuthForm from '@/app/(auth)/AuthForm'
import { signup } from '@/actions/auth'
import { useFormState } from 'react-dom'
import { UserRole } from '@/lib/definitions'

export default function Page() {
    const [state, action] = useFormState(signup, undefined)

    return (
        <AuthForm
            name='Sign Up'
            action={action} error={state?.serverError}
            switchLabel='Already have an account?'
            switchLink={<Link href='/login'>Login</Link>}
        >
            <FormInput label='Email' placeholder='name@example.com' type='email' name='email' required state={state} />
            <FormInput label='Password' placeholder='*****' type='password' name='password' required state={state} />
            <FormInput label='Confirm Password' placeholder='*****' type='password' name='confirm' required state={state} />
            <FormInput label='Username' placeholder='Username' name='username' required state={state} />
            <FormInput label='First Name' placeholder='First name' name='first' state={state} />
            <FormInput label='Last Name' placeholder='Last name' name='last' state={state} />
            <label htmlFor='roles'>Who are you?</label>
            <div>
                {Object.values(UserRole).map(role => (
                    <div key={role} className='flex'>
                        <label className='w-48' htmlFor={role}>{role}</label>
                        <input type='checkbox' name={role} />
                    </div>
                ))}
            </div>
        </AuthForm>
    )
}