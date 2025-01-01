import React from 'react';

const PersonalLinks: React.FC = () => {
  return (
    <footer className="bg-gray-600 text-white py-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-around">
        <p className="text-sm text-gray-400 mb-4 md:mb-0">
          Connect with me:
        </p>
        <div className="flex space-x-6 items-center">
          <a
            href="https://github.com/DevoTheDev"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80"
          >
            <img
              src="../github.png"
              alt="GitHub"
              className="w-8 h-8"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/devon-fennell-509997258"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80"
          >
            <img
              src="../linkedin.png"
              alt="LinkedIn"
              className="w-8 h-8"
            />
          </a>
          <a
            href="mailto:devonfennell18@gmail.com"
            className="hover:opacity-80"
          >
            <img
              src="../gmail.svg"
              alt="Gmail"
              className="w-8 h-8"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default PersonalLinks;
