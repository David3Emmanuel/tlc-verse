
import { getUserById } from '@/actions/user'
import MessagesView from '@/app/(normal)/chat/ChatsView'


export default async function Page() {
    return (
        <div className='flex flex-col'>
            <h1 className='text-xl font-medium text-center mt-5'>Your Messages</h1>
            <MessagesView getUser={getUserById} />
        </div>
    )
}