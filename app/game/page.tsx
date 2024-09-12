import { Metadata } from 'next'
import Lobby from '@/app/game/Lobby'
import { joinLobby } from '@/actions/multiplayer'

export const metadata: Metadata = {
    title: 'Multiplayer',
    description: 'Challenge your friends in a fun, competitive quiz game and top the leaderboard',
}

export default function Page() {
    return (<>
        <Lobby joinLobby={joinLobby} />
    </>)
}