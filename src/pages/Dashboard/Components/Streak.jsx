import { CheckCircle, CheckCircleSolid } from 'Components/Icons';
import React, { useEffect } from 'react'
import { authenticatedRequest } from 'utils/api';


const days = {
    0: 'SUN',
    1: 'MON',
    2: 'TUE',
    3: 'WED',
    4: 'THU',
    5: 'FRI',
    6: 'SAT'
}

export default function Streak(props) {
    const [streak, setStreak] = React.useState(0);
    const [daysStreak, setDaysStreak] = React.useState([]);

    useEffect(() => {
        authenticatedRequest('/question_banks/user/streak_details')
            .then(res => { setStreak(res.data.streak); setDaysStreak(res.data.weeklydetails) })
    }, [])


    return (
        <>
            <div className="flex items-center mt-4 flex-col justify-center">
                <div className="text-2xl"> Your Flash Cards Streak </div>
                {streak}

                <div className="flex mt-4">
                    {
                        Array(7).fill(0).map((_, i) => {
                            return <div className='mx-4 flex flex-col items-center' >
                                {
                                    daysStreak.includes(i) ? <CheckCircleSolid /> : <CheckCircle />
                                }
                                <div> {days[i]} </div>
                            </div>
                        })
                    }
                    {/* <CheckCircle />
                            <CheckCircleSolid /> */}
                </div>


            </div>
        </>
    )
}
