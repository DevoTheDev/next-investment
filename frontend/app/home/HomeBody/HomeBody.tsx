"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import PersonalLinks from '../../../components/ui/PersonalLinks/PersonalLinks';
import { ProjectCard } from '../../../components/ui/ProjectCard/ProjectCard';


const HomeBody: React.FC = () => {

  const router = useRouter();

  return (
    <div className="h-full w-full bg-black text-white">
      {/* Introductory Section */}
      <div className="flex flex-col md:flex-row items-center justify-center h-[70vh] bg-gradient-to-r from-gray-800 to-black px-6 py-12">
        <div className="text-center md:text-left max-w-lg">
          <h1 className="text-5xl font-bold mb-4">
            Welcome to <span className="text-customCyan">DevElement</span>
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            A showcase of dedication and creativity in crafting exceptional web solutions. 
            Explore my journey through dynamic projects built with modern technologies 
            and a passion for clean, efficient design.
          </p>
          <p className="mt-4 text-sm text-gray-400">
            Specializing in full-stack development with expertise in React, TypeScript, Python, and MongoDB.
          </p>
        </div>
        <div className="mt-8 md:mt-0 md:ml-8">
          <img
            className="rounded-xl shadow-lg"
            src="../devon-pic1.JPG"
            alt="DevElement Profile"
            width={320}
            height={320}
          />
        </div>
      </div>

      {/* Projects Section */}
      <div className="flex justify-evenly h-full bg-gray-700 w-full py-12">
        <ProjectCard
          title="Workout App"
          description="Track your progress, stay motivated, and achieve your fitness goals with ease."
          subtitle="Work in progress"
          subheading="Achieve Your Fitness Goals"
          secondaryText="Discover personalized workouts, progress tracking, and community support."
          buttonText="Start Exercising"
          imageSrc="../weight-rack-pic1.avif"
        />
        <ProjectCard
          title="NextInvestment"
          description="Master the stock market with the ultimate investment platform."
          subtitle="Work in progress"
          subheading="Empower Your Financial Future"
          secondaryText="Track your portfolio, analyze trends, and make data-driven investment decisions."
          buttonText="Start Investing"
          imageSrc="../stock-market-pic1.jpeg"
          onButtonClick={() =>router.push('/auth/login')}
        />
      </div>
      <PersonalLinks />
    </div>
  );
};

export default HomeBody;
