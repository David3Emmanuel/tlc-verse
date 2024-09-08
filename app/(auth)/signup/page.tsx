import Link from 'next/link'
import FormInput from '@/app/(auth)/FormInput'
import AuthForm from '@/app/(auth)/AuthForm'

export default function Page() {
    return (
        <AuthForm>
            <FormInput label='Email' placeholder='name@example.com' type='email' name='email' required />
            <FormInput label='Password' placeholder='*****' type='password' name='password' required />
            <FormInput label='Confirm Password' placeholder='*****' type='password' name='confirm' required />
            <FormInput label='Username' placeholder='Username' name='username' />
            <FormInput label='First Name' placeholder='First name' name='first' />
            <FormInput label='Last Name' placeholder='Last name' name='first' />
            <p>Already have an account? <Link href='/login'>Login</Link></p>
        </AuthForm>
    )
}