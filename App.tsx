
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import InputPanel from './components/InputPanel';
import OutputPanel from './components/OutputPanel';
import { generateScript } from './services/geminiService';
import { ScriptGenerationParams, SlideScript, SingleSlideScriptGenerationParams } from './types';

const App: React.FC = () => {
  const [generatedScript, setGeneratedScript] = useState<SlideScript[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateScript = useCallback(async (params: ScriptGenerationParams) => {
    setIsLoading(true);
    setError(null);
    setGeneratedScript([]); // Use empty array for progressive loading

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
        
        const result = await generateScript(singleSlideParams);
        
        setGeneratedScript(prevScripts => {
            const newScripts = [...(prevScripts || []), result];
            newScripts.sort((a, b) => a.slideNumber - b.slideNumber);
            return newScripts;
        });
      }

    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="flex flex-col h-screen bg-slate-900 text-white font-sans">
      <Header />
      <main className="flex-grow flex flex-col md:flex-row overflow-hidden">
        <InputPanel onGenerate={handleGenerateScript} isLoading={isLoading} />
        <OutputPanel scripts={generatedScript} isLoading={isLoading} error={error} />
      </main>
    </div>
  );
};

export default App;