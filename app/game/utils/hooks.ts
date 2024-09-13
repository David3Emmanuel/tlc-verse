'use client'

import { Game, Question } from '@/lib/definitions'
import { useWatchDB } from '@/lib/realtime'
import { useContext, useEffect, useState } from 'react'
import { Context } from '@/app/game/utils/context'

export function useLobby(joinLobby: () => Promise<{ error?: string }>) {
    const [games, payload] = useWatchDB<Game, string>('games')
    const [game, setGame] = useState<Game | null>(null)
    const { currentUser } = useContext(Context)

    useEffect(() => {
        if (!currentUser) return
        joinLobby()
            .then(({ error }) => {
                if (error) console.error(error)
            })
    }, [currentUser, joinLobby])

    useEffect(() => {
        (async () => {
            if (!games) return
            const availableGame = games.find(game => !game.completed && [game.player1, game.player2].includes(currentUser!.user_id))
            if (availableGame) setGame(availableGame)
        })()
    }, [games, payload, currentUser])

    return game
}

export function useGame(
    game: Game,
    serverQuestions: Question[],
    getQuestion: (questionId: number) => Promise<{ data?: Question, error?: string }>,
) {
    const gamePayload = useWatchDB<Game, string>('games')[1]
    const questionsPayload = useWatchDB<{ id: number, game_id: string, question_id: number, created_at: Date }, number>('games_questions')[1]

    const [player1Score, setPlayer1Score] = useState(game.player1_score)
    const [player2Score, setPlayer2Score] = useState(game.player2_score)
    const [questions, setQuestions] = useState(serverQuestions)

    useEffect(() => {
        if (gamePayload?.eventType === 'UPDATE' && gamePayload.old.id === game.id) {
            setPlayer1Score(gamePayload.new.player1_score)
            setPlayer2Score(gamePayload.new.player2_score)
        }
    }, [gamePayload, game.id])

    useEffect(() => {
        if (questionsPayload?.eventType === 'INSERT') {
            const questionId = questionsPayload.new.question_id
            getQuestion(questionId)
                .then(({data: newQuestion, error}) => {
                    console.log(newQuestion, error)
                    if (error) console.error(error)
                    setQuestions(prev => [...prev, newQuestion!])
                })
        }
    }, [questionsPayload, getQuestion])

    return {
        scores: [player1Score, player2Score] as [number, number],
        questions,
    }
}
