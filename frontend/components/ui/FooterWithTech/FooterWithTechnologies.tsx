import React from 'react';

export const FooterWithTechnologies: React.FC = () => {
  const technologies = [
    {
      name: "React",
      link: "https://reactjs.org/",
      logo: "../react.svg",
    },
    {
      name: "TypeScript",
      link: "https://www.typescriptlang.org/",
      logo: "../typescript.svg",
    },
    {
      name: "Python",
      link: "https://www.python.org/",
      logo: "../python.svg",
    },
    {
      name: "MongoDB",
      link: "https://www.mongodb.com/",
      logo: "../mongodb.svg",
    },
  ];

  return (
    <footer className=" text-white pt-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-evenly">
        <p className="text-sm text-gray-400 mb-4 md:mb-0">
          Built with passion using:
        </p>
        <div className="flex space-x-6 items-center">
          {technologies.map((tech, index) => (
            <a
              key={index}
              href={tech.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80"
            >
              <img
                src={tech.logo}
                alt={tech.name}
                className="w-8 h-8"
              />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
