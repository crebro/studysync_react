import { UserContext } from 'providers/UserProvider';
import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { authenticatedRequest } from 'utils/api';

export function PracticeChoose(props) {
    const [flashDecks, setFlashDecks] = React.useState([]);

    useEffect(() => {
        authenticatedRequest('/question_banks/available')
            .then(res => {
                setFlashDecks(res.data.question_banks);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <div className="flex flex-col items-center mt-4">
                <div className="flex items-center justify-start w-[80vw]">
                    <div className="text-3xl">
                        Available Question Banks
                    </div>
                </div>


                <div className='grid grid-cols-3 mt-2 w-[80vw]'>

                    {flashDecks && flashDecks.map(deck => {
                        return (
                            <Link className="flex flex-col bg-gray-200 rounded-lg p-4 m-2 relative" to={`/dashboard/flashdecks/${deck.id}`}>
                                <div className="text-lg"> {deck.name}</div>
                                <div className="bg-gray-500 rounded-lg p-4 m-2 w-full h-full absolute top-0 left-0" style={{ transform: `translate(1%, 1%)`, zIndex: -10 }}> </div>
                                <div className="bg-gray-600 rounded-lg p-4 m-2 w-full h-full absolute top-0 left-0" style={{ transform: `translate(2%, 2%)`, zIndex: -20 }}> </div>
                            </Link>)
                    })}
                    {/* <div className="bg-blue-500">hello</div> */}
                </div>

            </div>
        </>
    )
}
