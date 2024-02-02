import React from 'react';
import bgimage from 'assets/peoplestudying-home.jpg';

export function HeroSection() {
	return (
		<>
			<div
				className="w-full h-[60vh] flex justify-center items-center"
				style={{
					backgroundImage: `url(${bgimage})`,
					backgroundSize: 'cover',
				}}
			>
				<div className="flex flex-col justify-center items-center backdrop-brightness-50 h-full w-full">
					<div className="text-5xl font-bold text-center text-white">
						StudySync; The{' '}
						<span className="text-blue-500 ">Collaborative </span>{' '}
						Learning Solution
					</div>
					<div className="text-2xl text-center text-white">
						Because Team Work Makes the Dream Work
					</div>
				</div>
			</div>
		</>
	);
}
