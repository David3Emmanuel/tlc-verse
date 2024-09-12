'use client'

import { Game } from '@/lib/definitions'
import { useWatchDB } from '@/lib/realtime'
import { useContext, useEffect, useState } from 'react'
import { Context } from './context'

export function useLobby(joinLobby: () => Promise<{ error?: Error }>) {
    const [games, payload] = useWatchDB<Game, string>('games')
    const [game, setGame] = useState<Game | null>(null)
    const { currentUser } = useContext(Context)

    useEffect(() => {
        if (!currentUser) return
        joinLobby()
            .then(({ error }) => {
                if (error) console.error(error)
            })
    }, [currentUser])

    useEffect(() => {
        (async () => {
            if (!games) return
            const availableGame = games.find(game => !game.completed && [game.player1, game.player2].includes(currentUser!.user_id))
            if (availableGame) setGame(availableGame)
        })()
    }, [games, payload])

    return game
}