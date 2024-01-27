import React, { useContext } from 'react';
import { UserContext } from '../../providers/UserProvider';
import HomeNavigation from './Components/Navigation/HomeNavigation';
import { HeroSection } from './Components/HeroSection';

export default function Home() {
    const { user } = useContext(UserContext);

    return <div className="w-[100vw]">
        <HomeNavigation />
        <HeroSection />
    </div>
}