
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import InputPanel from './components/InputPanel';
import OutputPanel from './components/OutputPanel';
import { generateScript } from './services/geminiService';
import { ScriptGenerationParams, SlideScript } from './types';

const App: React.FC = () => {
  const [generatedScript, setGeneratedScript] = useState<SlideScript[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateScript = useCallback(async (params: ScriptGenerationParams) => {
    setIsLoading(true);
    setError(null);
    setGeneratedScript(null);
    
    try {
      const result = await generateScript(params);
      setGeneratedScript(result);
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
