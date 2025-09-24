
import React, { useState } from 'react';
import { SlideScript } from '../types';
import SparklesIcon from './icons/SparklesIcon';
import ClipboardIcon from './icons/ClipboardIcon';
import CheckIcon from './icons/CheckIcon';
import ClockIcon from './icons/ClockIcon';

interface OutputPanelProps {
  scripts: SlideScript[] | null;
  isLoading: boolean;
  error: string | null;
}

const formatTime = (seconds: number): string => {
  if (isNaN(seconds) || seconds < 0) return "0초";
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  let timeString = '';
  if (minutes > 0) {
    timeString += `${minutes}분 `;
  }
  if (remainingSeconds > 0 || minutes === 0) {
    timeString += `${remainingSeconds}초`;
  }
  return timeString.trim();
};

const SlideScriptCard: React.FC<{ slide: SlideScript }> = ({ slide }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(slide.script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-5 relative transition-shadow hover:shadow-xl hover:shadow-blue-900/20">
      <div className="flex justify-between items-start mb-3">
        <div>
            <h3 className="text-lg font-semibold text-blue-400">
            Slide {slide.slideNumber}
            </h3>
            {slide.estimatedSpeakingTime > 0 && (
                <div className="flex items-center text-sm text-slate-400 mt-1">
                    <ClockIcon className="w-4 h-4 mr-1.5"/>
                    <span>예상 발표 시간: {formatTime(slide.estimatedSpeakingTime)}</span>
                </div>
            )}
        </div>
        <button
          onClick={handleCopy}
          className="p-2 rounded-md bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white transition-all duration-200 flex-shrink-0"
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
    <div className="animate-pulse">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-5 mb-6">
            <div className="flex justify-around">
                <div className="text-center">
                    <div className="h-4 bg-slate-700 rounded w-20 mb-2"></div>
                    <div className="h-8 bg-slate-700 rounded w-16"></div>
                </div>
                <div className="text-center">
                    <div className="h-4 bg-slate-700 rounded w-24 mb-2"></div>
                    <div className="h-8 bg-slate-700 rounded w-20"></div>
                </div>
            </div>
        </div>
        <div className="space-y-6">
            {[...Array(2)].map((_, i) => (
                <div key={i} className="bg-slate-800 border border-slate-700 rounded-lg p-5">
                    <div className="flex justify-between items-start mb-3">
                        <div>
                            <div className="h-6 w-24 bg-slate-700 rounded mb-2"></div>
                            <div className="h-4 w-40 bg-slate-700 rounded"></div>
                        </div>
                        <div className="h-9 w-9 bg-slate-700 rounded-md"></div>
                    </div>
                    <div className="space-y-2 mt-4">
                        <div className="h-4 bg-slate-700 rounded"></div>
                        <div className="h-4 bg-slate-700 rounded w-5/6"></div>
                        <div className="h-4 bg-slate-700 rounded w-3/4"></div>
                    </div>
                </div>
            ))}
        </div>
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
    
    if (scripts && scripts.length > 0) {
      const totalSpeakingTime = scripts.reduce((total, slide) => total + (slide.estimatedSpeakingTime || 0), 0);

      return (
        <>
            <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-lg p-5 mb-6 sticky top-0 z-10">
                <div className="flex justify-around items-center">
                    <div className="text-center">
                        <p className="text-sm text-slate-400 mb-1">총 슬라이드</p>
                        <p className="text-2xl font-bold text-white">{scripts.length}</p>
                    </div>
                    <div className="border-l border-slate-600 h-12"></div>
                    <div className="text-center">
                        <p className="text-sm text-slate-400 mb-1">총 예상 발표 시간</p>
                        <p className="text-2xl font-bold text-white">{formatTime(totalSpeakingTime)}</p>
                    </div>
                </div>
            </div>
            <div className="space-y-6">
            {scripts.map((slide) => (
                <SlideScriptCard key={slide.slideNumber} slide={slide} />
            ))}
            </div>
        </>
      );
    }

    if (scripts) { // Handles empty array case
        return (
            <div className="flex flex-col items-center justify-center h-full text-center">
                <p className="text-slate-400 text-lg">결과 없음</p>
                <p className="text-slate-500 mt-2">
                    PPTX 파일에 텍스트 내용이 없거나 분석할 수 없습니다.
                </p>
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
    <div className="w-full md:w-2/3 lg:w-3/5 p-6 h-full overflow-y-auto relative">
      {renderContent()}
    </div>
  );
};

export default OutputPanel;
