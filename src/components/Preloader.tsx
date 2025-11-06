import React from 'react';

export const Preloader: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-gray-50 dark:bg-gray-900 flex items-center justify-center z-[100]">
      <div className="preloader-logo text-5xl font-bold text-gray-800 dark:text-white">
        WEL<span className="text-cyan-500"></span>COME
      </div>
    </div>
  );
};