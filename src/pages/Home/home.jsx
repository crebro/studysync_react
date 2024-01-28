import React from 'react';
import HomeNavigation from './Components/Navigation/HomeNavigation';
import { HeroSection } from './Components/HeroSection';

export default function Home() {
    return <div className="w-[100vw]">
        <HomeNavigation />
        <HeroSection />
    </div>
}