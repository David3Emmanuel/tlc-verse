import { answerQuestion, getGame, getQuestion, getQuestions } from '@/actions/multiplayer'
import { getCurrentUser, getUserById } from '@/actions/user'
import GameView from '@/app/game/[id]/GameView'

export default async function Page({ params }: {
    params: { id: string },
}) {
    const { error: currentUserError } = await getCurrentUser()
    if (currentUserError) throw new Error(currentUserError)

    const { data, error } = await getGame(params.id)
    if (error) {
        console.log(error)
        return <div>Something went wrong</div>
    }
    const game = data!

    const { player1: p1_id, player2: p2_id } = game!
    const { data: player1, error: p1Error } = await getUserById(p1_id)
    const { data: player2, error: p2Error } = await getUserById(p2_id)
    if (p1Error || p2Error) {
        console.log(p1Error, p2Error)
        return <div>Something went wrong</div>
    }

    const { data: questions, error: questionsError } = await getQuestions(game.id)
    if (questionsError) console.error(questionsError)

    return (<>
        <h2 className='text-xl text-center my-5 font-medium'>{player1!.username} vs {player2!.username}</h2>
        <GameView game={game} serverQuestions={questions!} getQuestion={getQuestion} answerQuestion={answerQuestion} />
    </>)
}