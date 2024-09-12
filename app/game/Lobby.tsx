'use client'

import { useLobby } from '@/app/game/utils/hooks'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Lobby({ joinLobby }: {
    joinLobby: () => Promise<{ error?: string }>
}) {
    const router = useRouter()
    const availableGame = useLobby(joinLobby)
    useEffect(() => {
        if (availableGame) router.push(`/game/${availableGame.id}`)
    }, [availableGame])

    return (
        <div>Waiting for a match...</div>
    )
}