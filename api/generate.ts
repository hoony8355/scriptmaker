import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI, Type } from "@google/genai";
import { SingleSlideScriptGenerationParams } from '../types';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const params = req.body as SingleSlideScriptGenerationParams;

    if (!process.env.API_KEY) {
      throw new Error("API_KEY environment variable not set.");
    }
    
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const createPrompt = (params: SingleSlideScriptGenerationParams): string => {
        return `
        You are a professional presentation consultant and an expert scriptwriter.
        Your task is to generate a natural and engaging script for a single presentation slide.

        **Overall Presentation Goal & Intention:**
        ${params.intention}

        **Slide Context:**
        This is slide number ${params.slideNumber} out of a total of ${params.totalSlides} slides.

        **Desired Script Tone & Style:**
        ${params.tone}

        **Desired Script Length for this slide:**
        ${params.length}

        **Raw Text Content from this Slide:**
        ---
        ${params.slideText}
        ---

        **Your Task:**
        Based on all the information above, please generate a script for this specific slide.
        - The script should be written as if a speaker is presenting it.
        - Ensure the script aligns with the provided tone and length requirements.
        - Provide an "estimatedSpeakingTime" in seconds, based on an average speaking rate.
        - The final output must be a single, valid JSON object.
        - The object must have three keys: "slideNumber" (integer), "script" (string), and "estimatedSpeakingTime" (integer).
        - Format the script text with paragraphs separated by "\\n\\n" for readability.
        - The slide number in the output JSON must be exactly ${params.slideNumber}.
        `;
    };

    const scriptSchema = {
        type: Type.OBJECT,
        properties: {
            slideNumber: { 
                type: Type.INTEGER,
                description: `The slide number, which must be ${params.slideNumber}.`
            },
            script: { 
                type: Type.STRING,
                description: 'The generated presentation script for the slide.'
            },
            estimatedSpeakingTime: { 
                type: Type.INTEGER,
                description: 'The estimated speaking time for the slide script in seconds.'
            }
        },
        required: ['slideNumber', 'script', 'estimatedSpeakingTime']
    };

    const prompt = createPrompt(params);

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: scriptSchema,
            temperature: 0.7,
        },
    });

    const jsonText = response.text;
    if (!jsonText) {
      throw new Error("The AI model returned an empty response. Please try again.");
    }
    const parsedResult = JSON.parse(jsonText.trim());

    // Enforce slide number consistency as a safeguard
    if (parsedResult.slideNumber !== params.slideNumber) {
        parsedResult.slideNumber = params.slideNumber;
    }

    return res.status(200).json(parsedResult);

  } catch (error) {
    console.error("Error in serverless function:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return res.status(500).json({ error: `Failed to generate script: ${errorMessage}` });
  }
}