'use server'

import { getCurrentUser } from '@/actions/user'
import supabase from '@/actions/supabase'
import { Game, Question } from '@/lib/definitions'
import { PostgrestError, SupabaseClient } from '@supabase/supabase-js'

export async function joinLobby(): Promise<{ error?: string }> {
    const { data: currentUser, error: currentUserError } = await getCurrentUser()
    if (currentUserError) return { error: currentUserError }

    const db = await supabase()
    console.log(currentUser!.username, 'is joining the lobby')

    const { error: joinLobbyError } = await db.from('lobby')
        .insert({ id: currentUser!.user_id })

    if (joinLobbyError) console.log(currentUser!.username, 'is already in the lobby')

    const { data: matchData, error: matchError } = await db.from('lobby')
        .select('*')
        .range(0, 1)
    if (matchError) return { error: matchError.message }

    if (matchData!.length < 2) return {}

    const { data: game, error: createGameError } = await matchPlayers(db, matchData[0].id, matchData[1].id)
    if (createGameError) return { error: createGameError }

    return {}
}

async function matchPlayers(db: SupabaseClient, player1: string, player2: string): Promise<{ data?: Game, error?: string }> {
    console.log('Matching', player1, player2)
    const { error: deleteError } = await db.from('lobby')
        .delete()
        .in('id', [player1, player2])
    if (deleteError) return { error: deleteError.message }

    const { data: createGameData, error: createGameError } = await db.from('games')
        .insert({ player1, player2 } as Game)
        .select()
    if (createGameError) return { error: createGameError.message }
    const game = createGameData[0] as Game

    const { error } = await addRandomQuestion(db, game.id)
    if (error) return { error }

    return { data: game }
}

export async function getGame(id: string): Promise<{ data?: Game, error?: string }> {
    const db = await supabase()
    const { data: game, error: getGameError }: { data: Game | null, error: PostgrestError | null } = await db.from('games')
        .select('*')
        .eq('id', id)
        .single()

    if (getGameError) return { error: getGameError?.message }
    return { data: game! }
}

export async function getQuestions(gameId: string): Promise<{ data?: Question[], error?: string }> {
    const db = await supabase()

    const { data: questionIds, error: getQuestionIdsError }: {
        data: { game_id: string, question_id: number }[] | null,
        error: PostgrestError | null,
    } = await db.from('games_questions')
        .select('*')
        .eq('game_id', gameId)
        .order('added_at', { ascending: true })
    if (getQuestionIdsError) return { error: getQuestionIdsError.message }

    const { data: questions, error: getQuestionsError } = await db.from('questions')
        .select('*')
        .in('id', questionIds!.map(
            ({ question_id }) => question_id
        ))
    if (getQuestionsError) return { error: getQuestionsError.message }
    return { data: questions }
}

async function addRandomQuestion(db: SupabaseClient, gameId: string): Promise<{ error?: string }> {
    console.log('adding random question to game', gameId)

    const { data, error: randomQuestionError }: { data: { id: number } | null, error: PostgrestError | null } = await db.rpc('get_random_questions', { num_questions: 1 })
        .single()
    if (randomQuestionError) return { error: randomQuestionError.message }
    const questionId = data!.id as number
    const { error } = await db.from('games_questions')
        .insert({ game_id: gameId, question_id: questionId })
    if (error) return { error: error.message }

    return {}
}

export async function getQuestion(questionId: number): Promise<{ data?: Question, error?: string }> {
    const db = await supabase()

    const { data: question, error: getQuestionError } = await db.from('questions')
        .select('*')
        .eq('id', questionId)
        .single()
    if (getQuestionError) return { error: getQuestionError.message }

    return { data: question! }
}

export async function answerQuestion(game: Game, correct: boolean): Promise<{ error?: string }> {
    const { data: currentUser, error: currentUserError } = await getCurrentUser()
    if (currentUserError) return { error: currentUserError }
    const playerIndex = [game.player1, game.player2].indexOf(currentUser!.user_id)
    
    console.log('Answering question...')

    const db = await supabase()

    if (correct) {
        const update = (playerIndex === 0)
            ? { player1_score: game.player1_score + 1 }
            : { player2_score: game.player2_score + 1 }

        const { error: updateError } = await db.from('games')
            .update(update)
        if (updateError) return { error: updateError.message }
    }

    addRandomQuestion(db, game.id)

    return {}
}
