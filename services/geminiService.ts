import { ScriptGenerationParams, SlideScript } from '../types';

export const generateScript = async (params: ScriptGenerationParams): Promise<SlideScript[]> => {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Server responded with status: ${response.status}`);
    }

    const result = await response.json();
    return result as SlideScript[];

  } catch (error) {
    console.error("Error generating script:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate script: ${error.message}`);
    }
    throw new Error("An unknown error occurred while generating the script.");
  }
};