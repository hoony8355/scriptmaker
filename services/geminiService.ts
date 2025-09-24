import { ScriptGenerationParams, SlideScript } from '../types';

const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const encoded = reader.result?.toString().split(',')[1];
            if (encoded) {
                resolve(encoded);
            } else {
                reject(new Error("Failed to convert file to base64"));
            }
        };
        reader.onerror = error => reject(error);
    });
};

export const parsePptxFile = async (file: File): Promise<string> => {
    try {
        const base64File = await fileToBase64(file);
        const response = await fetch('/api/parse', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ file: base64File }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `Server responded with status: ${response.status}`);
        }

        const result = await response.json();
        return result.slideContent;

    } catch (error) {
        console.error("Error parsing PPTX file via API:", error);
        if (error instanceof Error) {
            throw new Error(`${error.message}`);
        }
        throw new Error("An unknown error occurred while parsing the file.");
    }
}

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
