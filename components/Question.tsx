'use client'

import { Question as QuestionType } from '@/lib/definitions'
import { useState } from 'react'

export default function QuestionView({ index, question, onAnswer }: {
    index: number,
    question: QuestionType,
    onAnswer: (correct: boolean) => void,
}) {
    const [guess, setGuess] = useState(-1)
    const handleClick = (i: number) => {
        if (guess !== -1) return
        setGuess(i)
        setTimeout(() => {
            onAnswer(guess === question.correct_option_index)
        }, 1000)
    }


    return (
        <div className='card no-hover bg-neutral-700 w-72 px-5 max-w-full m-auto'>
            <p className='text-xl font-medium text-center'>Question {index + 1}</p>
            <p className='bg-neutral-600 rounded p-2'>{question.question}</p>
            <ul>
                {question.options.map((option, i) => {
                    let style: string
                    if (guess === -1) style = 'hover:bg-neutral-500'
                    else if (i === question.correct_option_index) style = 'bg-green-600 text-white cursor-default'
                    else if (guess === i) style = 'bg-red-600 text-white cursor-default'
                    else style = 'cursor-default'

                    return <li key={i} className='my-2'>
                        <button
                            className={`w-full p-2 rounded ${style}`}
                            onClick={() => handleClick(i)}
                        >
                            {option}
                        </button>
                    </li>
                })}
            </ul>
        </div>
    )
}