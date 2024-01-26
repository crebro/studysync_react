import React from 'react'
import { Link } from 'react-router-dom'

export default function Navigation(props) {
    return (
        <>
            <div className='w-full items-center flex justify-evenly'>
                <Link to="/dashboard"> Dashboard </Link>
                <Link to="/dashboard/your-spaces"> Your Spaces </Link>
            </div>
        </>
    )
}
