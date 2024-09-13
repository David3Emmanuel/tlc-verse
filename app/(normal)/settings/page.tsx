import { getCurrentUser, getUserById, updateProfile } from '@/actions/user'
import ProfilePic, { ProfilePicPlaceholder } from '@/components/ProfilePic'
import { redirect } from 'next/navigation'

import { Suspense } from 'react'
import FileUpload from '@/components/FileUpload'
import { UserRole } from '@/lib/definitions'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Settings',
    description: 'Update your profile',
}

export default async function Page() {
    const { data: sessionUser, error: sessionError } = await getCurrentUser()
    if (sessionError) redirect('/login')

    const { data, error } = await getUserById(sessionUser!.user_id)
    if (error) {
        console.error(error)
        return <div>Something went wrong.</div>
    }
    const currentUser = data!

    // TODO add drag and drop

    return (
        <form className='form form:w-[32rem]' action={updateProfile}>
            <h1 className='font-medium text-2xl text-center'>Settings</h1>
            <div>
                <Suspense fallback={<ProfilePicPlaceholder />}>
                    <ProfilePic user={currentUser} />
                </Suspense>
            </div>
            <h2 className='font-medium text-center text-xl text-neutral-500'>{currentUser.username}</h2>
            <FileUpload name='image' id='image' />
            <textarea rows={5} name='bio' className='p-2 border border-neutral-300 rounded' defaultValue={currentUser.bio} />
            <h3 className='mt-2 font-medium text-center'>Which role best describes you?</h3>
            <div>
                {Object.values(UserRole).map(role => (
                    <div key={role} className='flex w-full justify-center'>
                        <label className='w-48' htmlFor={role}>{role}</label>
                        <input type='checkbox' name={role} defaultChecked={currentUser.roles.includes(role)} />
                    </div>
                ))}
            </div>
            <button type='submit' className='button'>Update</button>
        </form>
    )
}