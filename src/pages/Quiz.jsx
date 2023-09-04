import { useNavigate } from 'react-router-dom'
import { useState } from "react"
import data from "../data.json"

let sum = 0

export default function Quiz() {
    const [questionIndex, setQuestionIndex] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const currentQuestion = data[questionIndex]
    const navigate = useNavigate();

    async function simulateCalculation() {
        setIsLoading(true)
        return new Promise(resolve => {
            setTimeout(() => {
                setIsLoading(false)
                resolve()
            }, 1000);
        })
    }

    async function next(id, weight) {
        sum += weight

        if (id <= 9) {
            setQuestionIndex(q => q + 1)
        } else {
            await simulateCalculation()
            navigate("/result", { state: { result: sum } })
            return
        }
    }

    return (
        <div className="relative h-screen">
            <picture>
                <source media="(min-width: 1200px)" srcSet="../src/assets/background/1200-bg.png" />
                <source media="(min-width: 768px)" srcSet="../src/assets/background/810-bg.png" />
                <img src="../src/assets/background/375-bg.png" alt="Image description" className="w-full h-full object-cover" />
            </picture>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[500px] md px-5">
                {isLoading ?
                    <Loading />
                    : <>
                        <img src="../src/assets/quiz/poster.png" alt="poster" />
                        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 h-full w-2/3">
                            <div className="relative h-full mx-6 text-sm md:text-base">
                                {/* 題目 */}
                                <div className="absolute top-16 md:top-[16%] w-full py-1">
                                    <img src={currentQuestion.label} alt="label" className="block h-8" />
                                    <p className="mt-2">{currentQuestion.question}</p>
                                </div>

                                {/* 選項 */}
                                <div className="absolute bottom-16 md:top-1/2 md:-translate-y-1/3 md: w-full space-y-2 md:space-y-3">
                                    {currentQuestion.answers.map(answer =>
                                        <button className="rounded-full py-2.5 w-full bg-white" key={answer.weight} onClick={() => next(currentQuestion.id, answer.weight)}>{answer.content}</button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                }

            </div>
        </div>
    )
}

function Loading() {
    return <div className='bg-white/40 rounded-xl pt-16 pb-12 mx-5 space-y-5'>
        <img src="../src/assets/result-element/loader.png" alt="loader" className='w-20 h-20 block mx-auto animate-bounce' />
        <img src="../src/assets/result-element/wood.png" alt="loader" className='w-20 block mx-auto' />
        <p className='text-center text-slate-800 pt-3'>正在收集結果...</p>
    </div>
}
