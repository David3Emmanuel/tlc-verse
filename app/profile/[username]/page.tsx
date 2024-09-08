import { users } from '@/lib/dummy'

export function generateStaticParams() {
    return users.map(user => {username: user.username})
}

export default function Page({ params }: {
    params: { username: string },
}) {
    return (
        <h1>{params.username}</h1>
    )
}