import React, { useContext } from 'react';
import { UserContext } from '../providers/UserProvider';

export default function Home() {
    const { user } = useContext(UserContext);

    return <div className="w-full h-[100vh]">
        <div className="flex flex-col items-center justify-center w-full h-full">
            Study Sync
            {user && <div className="text-center">Welcome {user.name}</div>}
        </div>
    </div>
}