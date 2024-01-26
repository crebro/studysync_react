import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../providers/UserProvider';
import { useNavigate } from 'react-router-dom';
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
            <div className=''>
                Welcome {user.name}
            </div>
        </>
    )
}
