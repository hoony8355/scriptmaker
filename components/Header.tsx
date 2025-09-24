
import React from 'react';
import SparklesIcon from './icons/SparklesIcon';

const Header: React.FC = () => {
  return (
    <header className="w-full p-4 border-b border-slate-700">
      <div className="max-w-7xl mx-auto flex items-center space-x-3">
        <SparklesIcon className="w-8 h-8 text-blue-400" />
        <h1 className="text-2xl font-bold text-white">
          AI 발표 스크립트 생성기
        </h1>
        <span className="text-sm bg-blue-500/20 text-blue-300 px-2 py-1 rounded-md">
            v1.0
        </span>
      </div>
    </header>
  );
};

export default Header;
