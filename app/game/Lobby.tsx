'use client'

import { useLobby } from '@/app/game/utils/hooks'
import { useRouter } from 'next/navigation'

export default function Lobby({ joinLobby }: {
    joinLobby: () => Promise<{ error?: Error }>
}) {
    const router = useRouter()
    const availableGame = useLobby(joinLobby)
    if (availableGame) router.push(`/game/${availableGame.id}`)

    return (
        <div>Waiting for a match...</div>
    )
}