import Link from 'next/link'
import FormInput from '@/app/(auth)/FormInput'
import AuthForm from '@/app/(auth)/AuthForm'

export default function Page() {
    return (
        <AuthForm>
            <FormInput label='Email' placeholder='name@example.com' type='email' name='email' required />
            <FormInput label='Password' placeholder='*****' type='password' name='password' required />
            <p>Don&apos;t have an account? <Link href='/signup'>Sign up</Link></p>
        </AuthForm>
    )
}