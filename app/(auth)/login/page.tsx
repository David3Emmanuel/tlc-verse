'use client'

import Link from 'next/link'
import FormInput from '@/app/(auth)/FormInput'
import AuthForm from '@/app/(auth)/AuthForm'
import { login } from '@/actions/auth'
import { useFormState } from 'react-dom'

export default function Page() {
    const [state, action] = useFormState(login, undefined)

    return (
        <AuthForm
            name='Login'
            action={action} error={state?.serverError}
            success={state?.message}
            switchLabel='Don&apos;t have an account?'
            switchLink={<Link href='/signup'>Sign up</Link>}
        >
            <FormInput label='Email' placeholder='name@example.com' type='email' name='email' required state={state} />
            <FormInput label='Password' placeholder='*****' type='password' name='password' required state={state} />
        </AuthForm>
    )
}