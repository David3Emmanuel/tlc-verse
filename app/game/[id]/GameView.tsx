'use client'

import { Game, Question as QuestionType } from '@/lib/definitions'
import { useGame } from '@/app/game/utils/hooks'
import Question from '@/components/Question'

export default function GameView({ game, serverQuestions, getQuestion, answerQuestion }: {
    game: Game,
    serverQuestions: QuestionType[],
    getQuestion: (questionId: number) => Promise<{ data?: QuestionType, error?: string }>,
    answerQuestion: (game: Game, correct: boolean) => void,
}) {
    const { scores, questions } = useGame(game, serverQuestions, getQuestion)

    return (
        <div>
            <h2 className='font-xl font-medium text-center'>{scores[0]} - {scores[1]}</h2>
            {questions.map((question, i) => (
                <Question index={i} key={i} question={question} onAnswer={(correct: boolean) => {
                    answerQuestion(game, correct)
                }} />
            ))}
        </div>
    )
}