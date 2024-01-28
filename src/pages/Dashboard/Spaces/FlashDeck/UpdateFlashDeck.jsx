import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { authenticatedPost, authenticatedRequest } from 'utils/api';
import ReactCardFlip from 'react-card-flip';
import { toast } from 'react-hot-toast';

export function UpdateFlashDeck(props) {
    const { id } = useParams();
    const [flashDeck, setFlashDeck] = useState(null);
    const navigate = useNavigate();

    const questionRef = useRef(null);
    const answerRef = useRef(null);

    useEffect(() => {
        authenticatedRequest(`/question_banks/${id}`)
            .then(res => {
                setFlashDeck(res.data.question_bank);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const createQuestion = async () => {
        const response = await authenticatedPost(`/question_banks/question`, {
            question_text: questionRef.current.value,
            question_bank_id: flashDeck.id,
            answer_text: answerRef.current.value
        });
        if (response.data.question) {
            toast.success('Question created!');
            setFlashDeck({ ...flashDeck, questions: [...flashDeck.questions, response.data.question] });
        }
    }


    return (
        <>
            <div className="flex flex-col items-center mt-4">
                <div className="w-[80vw]">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-3xl">
                                Your FlashDeck; {flashDeck && flashDeck.name}
                            </div>
                        </div>
                    </div>

                    <div className="flex">
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            ref={questionRef} />
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            ref={answerRef} />
                        <button className='bg-green-600 text-white px-4 py-2  mx-2 my-1 rounded-lg' onClick={() => createQuestion()}> Create </button>
                    </div>


                    {flashDeck && flashDeck.questions.map((question) => {
                        return <div>
                            <FlashDeckQuestion question={question} />
                        </div>
                    })}
                </div>
            </div>
        </>
    )
}

function FlashDeckQuestion(question) {
    const questionRef = useRef(null);
    const answerRef = useRef(null);

    const updateQuestion = async () => {
        const response = await authenticatedPost(`/question_banks/question/${question.question.id}`, {
            question_text: questionRef.current.value,
            answer_text: answerRef.current.value
        });
        if (response.data.question) {
            toast.success('Question updated!');
        }
    }


    return <div className='flex'>
        <input ref={questionRef}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            defaultValue={question.question.question_text} />
        <input ref={answerRef}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            defaultValue={question.question.answer_text} />

        <button className='bg-blue-600 text-white px-4 py-2  mx-2 my-1 rounded-lg' onClick={() => updateQuestion()}> Update </button>
    </div>
}
