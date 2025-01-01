import React from 'react';
import { FooterWithTechnologies } from '../FooterWithTech/FooterWithTechnologies';

interface ProjectCardProps {
  title: string;
  description: string;
  subheading: string;
  subtitle: string; // New prop for status like "Work in progress" or "Complete"
  secondaryText: string;
  buttonText: string;
  imageSrc: string;
  onButtonClick?: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  subheading,
  subtitle,
  secondaryText,
  buttonText,
  imageSrc,
  onButtonClick,
}) => {
  return (
    <div className="flex justify-evenly h-full items-center w-full">
      <div className="bg-gray-600 pb-10 px-6 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105">
        <div className="relative max-w-lg mx-auto">
          <img
            src={imageSrc}
            alt={title}
            className="rounded-xl w-full h-auto shadow-lg object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 rounded-xl flex flex-col justify-center items-center text-white">
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="mt-1 text-sm font-medium text-yellow-300">{subtitle}</p> {/* Subtitle */}
            <p className="mt-2 text-sm text-gray-300 text-center px-4">
              {description}
            </p>
          </div>
        </div>
        <div className="mt-8 text-center">
          <h2 className="text-xl font-semibold text-gray-200">{subheading}</h2>
          <p className="text-gray-600">{secondaryText}</p>
          <button
            className="mt-2 bg-gray-500 hover:bg-gray-700 text-white hover:text-customCyan font-medium px-6 py-3 rounded-lg shadow-md"
            onClick={onButtonClick}
          >
            {buttonText}
          </button>
        </div>
        <FooterWithTechnologies />
      </div>
    </div>
  );
};

