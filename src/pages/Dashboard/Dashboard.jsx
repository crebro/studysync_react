import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../providers/UserProvider';
import { Link, useNavigate } from 'react-router-dom';
import Navigation from './Components/Navigation';


export default function Dashboard(props) {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, []);

    return (
        <>
            <div className="flex w-full items-center justify-center py-4">
                <div className="w-[80vw]">
                    <div className='text-2xl'>
                        Hey, <span className='text-blue-600'>{user.name}  </span>
                    </div>   
                    <div className='text-sm'>
                        Let's Continue with your work
                    </div>


                    <div className="flex items-center mt-4 ">
                        <Link to="/dashboard/your-spaces" className="flex-1 p-4 bg-gray-200 rounded-lg mx-2">
                            <div className="text-2xl"> Your Spaces </div>
                            <div className="text-sm"> Where you can share what you know. Collaborate with your friends, learn something new. </div>
                        </Link>
                        <Link to="/dashboard/your-flashcards" className="flex-1 p-4 bg-gray-200 rounded-lg mx-2">
                            <div className="text-2xl"> Flashcards </div>
                            <div className="text-sm"> Where you can build on your knowledge. Your new flashcards session awaits you. </div>
                        </Link>
                    </div>
                </div>

            </div>
        </>
    )
}
