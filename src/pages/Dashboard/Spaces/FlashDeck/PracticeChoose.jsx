import { UserContext } from 'providers/UserProvider';
import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { authenticatedRequest } from 'utils/api';

export function PracticeChoose(props) {
    const [flashDecks, setFlashDecks] = React.useState([]);
    const { user } = useContext(UserContext);

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


                <div className='grid grid-cols-3 mt-2'>

                    {flashDecks && flashDecks.map(deck => {
                        return (
                            <Link className="flex flex-col bg-gray-200 rounded-lg p-4 m-2" to={`/dashboard/flashdecks/${deck.id}`}>
                                <div className="text-lg"> {deck.name}</div>
                                {/* {flashDecks.creator_id === user.id && <div className="text-sm text-blue-500"> You are the creator of this deck. </div>} */}
                            </Link>)
                    })}
                </div>

            </div>
        </>
    )
}
