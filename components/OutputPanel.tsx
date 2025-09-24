
import React, { useState } from 'react';
import { SlideScript } from '../types';
import SparklesIcon from './icons/SparklesIcon';
import ClipboardIcon from './icons/ClipboardIcon';
import CheckIcon from './icons/CheckIcon';

interface OutputPanelProps {
  scripts: SlideScript[] | null;
  isLoading: boolean;
  error: string | null;
}

const SlideScriptCard: React.FC<{ slide: SlideScript }> = ({ slide }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(slide.script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-5 relative transition-shadow hover:shadow-xl hover:shadow-blue-900/20">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-blue-400">
          Slide {slide.slideNumber}
        </h3>
        <button
          onClick={handleCopy}
          className="p-2 rounded-md bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white transition-all duration-200"
          title="Copy script"
        >
          {copied ? <CheckIcon className="w-5 h-5 text-green-400" /> : <ClipboardIcon className="w-5 h-5" />}
        </button>
      </div>
      <div className="text-slate-300 whitespace-pre-wrap leading-relaxed">
        {slide.script.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-4 last:mb-0">{paragraph}</p>
        ))}
      </div>
    </div>
  );
};

const LoadingSkeleton: React.FC = () => (
    <div className="space-y-6 animate-pulse">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="bg-slate-800 border border-slate-700 rounded-lg p-5">
            <div className="h-6 w-1/4 bg-slate-700 rounded mb-4"></div>
            <div className="space-y-2">
                <div className="h-4 bg-slate-700 rounded"></div>
                <div className="h-4 bg-slate-700 rounded w-5/6"></div>
                <div className="h-4 bg-slate-700 rounded w-3/4"></div>
            </div>
        </div>
      ))}
    </div>
);


const OutputPanel: React.FC<OutputPanelProps> = ({ scripts, isLoading, error }) => {
  const renderContent = () => {
    if (isLoading) {
      return <LoadingSkeleton />;
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <p className="text-red-400 text-lg">⚠️ 스크립트 생성 실패</p>
          <p className="text-slate-400 mt-2">{error}</p>
        </div>
      );
    }
    
    if (scripts) {
      return (
        <div className="space-y-6">
          {scripts.map((slide) => (
            <SlideScriptCard key={slide.slideNumber} slide={slide} />
          ))}
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <SparklesIcon className="w-16 h-16 text-slate-600 mb-4" />
        <h2 className="text-2xl font-bold text-slate-300">결과가 여기에 표시됩니다</h2>
        <p className="text-slate-500 mt-2">
          왼쪽 패널에서 정보를 입력하고 '스크립트 생성하기'를 클릭하세요.
        </p>
      </div>
    );
  };

  return (
    <div className="w-full md:w-2/3 lg:w-3/5 p-6 h-full overflow-y-auto">
      {renderContent()}
    </div>
  );
};

export default OutputPanel;
