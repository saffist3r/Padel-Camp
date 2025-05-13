import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-center space-x-3">
          <img
            src="https://image.ballejaune.com/logos/100/13003_1732234763.jpg"
            alt="Club Logo"
            className="h-10 w-10 object-contain rounded-full"
          />
          <div className="text-center">
            <h1 className="text-xl font-semibold text-gray-900">
              Padel Tournament
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Track your tournament progress and results
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header; 