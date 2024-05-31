import React from 'react';

interface LoadingProps {
  isLoading: boolean;
}

const Loading: React.FC<LoadingProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-lg"></div>
      <div className="relative flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-solid border-white border-t-transparent rounded-full animate-spin"></div>
        <span className="text-white mt-4 text-sm animate-pulse">Tunggu Sebentar...</span>
      </div>
    </div>
  );
};

export default Loading;