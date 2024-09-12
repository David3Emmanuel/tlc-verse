'use server'

import { getCurrentUser } from '@/actions/user'
import supabase from '@/actions/supabase'
import { Game } from '@/lib/definitions'

export async function joinLobby() {
    const { data: currentUser, error: currentUserError } = await getCurrentUser()
    if (currentUserError) return { error: currentUserError }

    const db = await supabase()
    console.log(currentUser!.username, 'is joining the lobby')

    const { data: joinLobbyData, error: joinLobbyError } = await db.from('lobby')
        .insert({ id: currentUser!.user_id })

    if (joinLobbyError) console.log(currentUser!.username, 'is already in the lobby')

    const { data: matchData, error: matchError } = await db.from('lobby')
        .select('*')
        .range(0, 1)

    if (matchData?.length === 2) {
        console.log('Found a match:', matchData[0], matchData[1])
        const player1 = matchData[0].id as string
        const player2 = matchData[1].id as string
        const { error: deleteError } = await db.from('lobby')
            .delete()
            .in('id', [player1, player2])
        if (deleteError) return { error: deleteError }

        const { data: createGameData, error: createGameError } = await db.from('games')
            .insert({ player1, player2 } as Game)
            .select()
        if (createGameError) return { error: createGameError }
        console.log(createGameData)
    }

    return {} as { error?: Error }
}
