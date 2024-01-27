import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { authenticatedRequest } from 'utils/api';
import ReactCardFlip from 'react-card-flip';

export function FlashDeck(props) {
    const { id } = useParams();
    const [flashDeck, setFlashDeck] = useState(null);
    const [isFlipped, setIsFlipped] = useState(false);
    const [currentCard, setCurrentCard] = useState(null);

    useEffect(() => {
        authenticatedRequest(`/question_banks/${id}`)
            .then(res => {
                setFlashDeck(res.data.question_bank);
                setCurrentCard(0);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

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
                </div>
                {
                    flashDeck &&
                    <>
                        <div className='w-80'>

                            <ReactCardFlip
                                isFlipped={isFlipped}
                            >
                                <div className="front border-blue-200 p-4 rounded-lg border-2 bg-blue-500 text-white text-center cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
                                    <div className="text-xl">  {flashDeck.questions[currentCard].question_text} </div>
                                </div>
                                <div className="back border-blue-200 p-4 rounded-lg border-2 bg-green-400 text-white text-center cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
                                    <div className='text-xl' >{flashDeck.questions[currentCard].answer_text}</div>
                                </div>

                            </ReactCardFlip>
                            <button className={`py-2 rounded-lg w-full text-white mt-4 ${isFlipped ? "bg-blue-600" : "bg-blue-400"}`} onClick={() => { setIsFlipped(false); setCurrentCard(currcard => currcard !== flashDeck.questions.length - 1 ? currcard + 1 : currcard) }}> Next </button>
                            <button className='py-2 rounded-lg bg-blue-400 w-full text-white mt-2' onClick={() => setCurrentCard(currcard => currcard !== 0 ? currcard - 1 : 0)}> Previous </button>

                            {
                                currentCard === flashDeck.questions.length - 1 &&
                                <button className='py-2 rounded-lg bg-green-400 w-full text-white mt-2' onClick={() => setCurrentCard(0)}> Mark Session as Complete </button>
                            }

                        </div>

                    </>
                }

            </div>



        </>
    )
}
