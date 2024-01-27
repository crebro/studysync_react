import { UserContext } from 'providers/UserProvider'
import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { authenticatedPost } from 'utils/api';

export function InvitationJoin(props) {
    const { user, setUser } = useContext(UserContext);
    const { invitation_code } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) { return; }
        authenticatedPost('/invitation/join', { invitation_code: invitation_code }).then((response) => {
            if (response.data.success) {
                navigate('/dashboard/your-spaces');
            }
        });
    }, []);

    return (
        <>
            {user ? <div className='flex flex-col justify-center items-center w-full h-screen'>
                <div className='text-3xl font-bold'>
                    You have been invited to join a space!
                </div>
                <div className='text-2xl'>
                    Please wait.
                </div>
            </div> : <div className='flex flex-col justify-center items-center w-full h-screen'>
                <div className='text-3xl font-bold'>
                    You have been invited to join a space!
                </div>
                <div className='text-2xl'>
                    Please login and come back to this link to join
                </div>
            </div>}


        </>
    )
}
