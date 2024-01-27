import React, { useContext } from 'react'
import defaultUser from "assets/defaultuser.jpg"
import studysynclogo from "assets/study sync logo.png"
import { UserContext } from 'providers/UserProvider';
import { Link } from 'react-router-dom';

export default function Navigation() {
    const { user } = useContext(UserContext);

    return (
        <>
            <div className='w-full items-center flex justify-evenly bg-[#332727] py-4'>
                <div className="flex items-center">
                    <Link to="/dashboard"><img src={studysynclogo} className='w-14 h-14 rounded-full' /> </Link>
                    <input className='px-4 py-2 text-lg rounded-3xl ml-2' placeholder='Search in your spaces' />
                </div>
                <div className="flex items-center">
                    <img src={defaultUser} className='w-8 h-8 rounded-full' />
                    <div className="text-white text-lg mx-4">
                        {user.name}
                    </div>
                </div>
            </div>
        </>
    )
}
