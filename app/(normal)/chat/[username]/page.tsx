import { getUserById, getUserByUsername } from '@/actions/user'
import ChatsView from '@/app/(normal)/chat/ChatsView'
import MessagesView from '../MessagesView'

export default async function Page({ params }: {
    params: { username: string },
}) {
    const { data: user, error } = await getUserByUsername(params.username)
    if (error) return <div>{error}</div>

    return (
        <div className='flex gap-2 px-2 h-[95vh] sm:h-[80vh]'>
            <div className='flex-1 hidden sm:block'><ChatsView getUser={getUserById} /></div>
            <MessagesView user={user!} />
        </div>
    )
}