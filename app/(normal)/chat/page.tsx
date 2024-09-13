
import { getUserById } from '@/actions/user'
import MessagesView from '@/app/(normal)/chat/ChatsView'
import { Suspense } from 'react'


export default async function Page() {
    return (
        <div className='flex flex-col'>
            <h1 className='text-xl font-medium text-center mt-5'>Your Messages</h1>
            <Suspense>
                <MessagesView getUser={getUserById} />
            </Suspense>
        </div>
    )
}