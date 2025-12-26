import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import InputPanel from './components/InputPanel';
import OutputPanel from './components/OutputPanel';
import { generateScript } from './services/geminiService';
import { ScriptGenerationParams, SlideScript, SingleSlideScriptGenerationParams } from './types';

// Function to introduce a delay
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const App: React.FC = () => {
  const [generatedScript, setGeneratedScript] = useState<SlideScript[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [progressMessage, setProgressMessage] = useState<string>('');

  const handleGenerateScript = useCallback(async (params: ScriptGenerationParams) => {
    setIsLoading(true);
    setError(null);
    setGeneratedScript([]); // Use empty array for progressive loading
    setProgressMessage('슬라이드 분석 시작...');

    try {
      const slideTexts = params.slideContent.split('\n\n---SLIDE BREAK---\n\n').map(s => s.replace(/^Slide \d+:\n/, ''));
      
      for (let i = 0; i < slideTexts.length; i++) {
        const slideText = slideTexts[i];
        if (!slideText.trim()) continue; // Skip empty slides

        const slideNumber = i + 1;

        const singleSlideParams: SingleSlideScriptGenerationParams = {
            slideNumber,
            slideText,
            totalSlides: slideTexts.length,
            intention: params.intention,
            tone: params.tone,
            length: params.length,
        };
        
        let success = false;
        let retryCount = 0;
        const maxRetries = 5; // Prevent infinite loops

        while (!success && retryCount < maxRetries) {
            try {
                setProgressMessage(`슬라이드 ${slideNumber} / ${slideTexts.length} 스크립트 생성 중...`);
                const result = await generateScript(singleSlideParams);
                
                setGeneratedScript(prevScripts => {
                    const newScripts = [...(prevScripts || []), result];
                    newScripts.sort((a, b) => a.slideNumber - b.slideNumber);
                    return newScripts;
                });
                success = true;

            } catch (err: any) {
                if (err.message === "RATE_LIMIT_EXCEEDED") {
                    retryCount++;
                    // Wait for 60 seconds if rate limit is hit (safe buffer for ~47s requirement)
                    const waitTime = 60;
                    for (let w = waitTime; w > 0; w--) {
                         setProgressMessage(`API 사용량 초과. ${w}초 후 재시도합니다... (슬라이드 ${slideNumber})`);
                         await sleep(1000);
                    }
                    // After waiting, loop continues to retry
                } else {
                    // Other errors are fatal for this slide, or we could skip it.
                    // For now, let's stop the process to show the error.
                    throw err;
                }
            }
        }
        
        if (!success) {
            throw new Error(`슬라이드 ${slideNumber} 생성 실패 (재시도 횟수 초과)`);
        }

        // To comply with the API rate limit (e.g., 10 requests per minute for the free tier),
        // we add a delay between requests. 
        if (i < slideTexts.length - 1) {
            // Only sleep if we didn't just spend 60s waiting
            // But to be safe, we always keep a small buffer between successful calls
            setProgressMessage(`다음 슬라이드(${i + 2}) 준비 중...`);
            await sleep(6100);
        }
      }

    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
      setProgressMessage('');
    }
  }, []);

  return (
    <div className="flex flex-col h-screen bg-slate-900 text-white font-sans">
      <Header />
      <main className="flex-grow flex flex-col md:flex-row overflow-hidden">
        <InputPanel onGenerate={handleGenerateScript} isLoading={isLoading} progressMessage={progressMessage} />
        <OutputPanel scripts={generatedScript} isLoading={isLoading} error={error} />
      </main>
    </div>
  );
};

export default App;