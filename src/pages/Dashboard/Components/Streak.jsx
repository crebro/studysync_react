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
    const [streakLeaderboard, setStreakLeaderboard] = React.useState([]); 


    useEffect(() => {
        authenticatedRequest('/question_banks/user/streak_details')
            .then(res => { setStreak(res.data.streak); setDaysStreak(res.data.weeklydetails) })

        authenticatedRequest('/question_banks/user/streak_leaderboard')
            .then(res => { setStreakLeaderboard(res.data.leaderboard) })
    }, [])


    return (
        <>
            <div className="flex items-center mt-4 flex-col justify-center">
                <div className="text-2xl"> Your Flash Cards Streak </div>
                <div className="text-4xl text-[#ffab19] font-extrabold">
                    {streak}
                </div>

                <div className="flex mt-4">
                    {
                        Array(7).fill(0).map((_, i) => {
                            return <div className='mx-4 flex flex-col items-center' >
                                {
                                    daysStreak.includes(i !== 6 ? i + 1 : 0) ? <CheckCircleSolid /> : <CheckCircle />
                                }
                                <div> {days[i !== 6 ? i + 1 : 0]} </div>
                            </div>
                        })
                    }
                </div>


                <div className='flex flex-col items-center justify-center mt-8'>
                    <div className='px-4 py-4 rounded-lg bg-gray-200'>


                        <div className="text-2xl mt-4 font-bold"> Streak Leaderboard </div>
                        <div className="flex flex-col items-center">
                            {
                                streakLeaderboard.map((streak, i) => {
                                    return <div className="flex items-center justify-center mt-2">
                                        <div className="text-2xl"> {i + 1}. </div>
                                        <div className="text-2xl"> {streak.user.name} </div>
                                        <div className="text-2xl text-stroke font-extrabold ml-4"> {streak.streak} </div>
                                    </div>
                                })

                            }

                        </div>
                    </div>
                </div>



            </div>
        </>
    )
}
