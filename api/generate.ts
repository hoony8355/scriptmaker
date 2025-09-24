import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI, Type } from "@google/genai";
import { ScriptGenerationParams } from '../types';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const params = req.body as ScriptGenerationParams;

    if (!process.env.API_KEY) {
      throw new Error("API_KEY environment variable not set.");
    }
    
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const createPrompt = (params: ScriptGenerationParams): string => {
        return `
        You are a professional presentation consultant and an expert scriptwriter.
        Your task is to generate a natural, engaging, and easy-to-read presentation script for a speaker.

        **Presentation Goal & Intention:**
        ${params.intention}

        **Desired Script Tone & Style:**
        ${params.tone}

        **Desired Script Length (per slide):**
        ${params.length}

        **Raw Text Content from Slides:**
        The following text is the raw content extracted from presentation slides. Each slide's content is separated by "---SLIDE BREAK---".
        ---
        ${params.slideContent}
        ---

        **Your Task:**
        Based on all the information above, please generate a script for each slide.
        - The script should be written as if a speaker is presenting it.
        - Ensure the script for each slide aligns with the provided tone and length requirements.
        - For each script, also provide an "estimatedSpeakingTime" in seconds, based on an average speaking rate.
        - The final output must be a valid JSON array where each object represents one slide.
        - Each object must have three keys: "slideNumber" (an integer, starting from 1), "script" (the generated text for that slide), and "estimatedSpeakingTime" (an integer representing the speaking time in seconds).
        - Format the script text with paragraphs separated by "\\n\\n" for readability.
        `;
    };

    const scriptSchema = {
        type: Type.ARRAY,
        items: {
            type: Type.OBJECT,
            properties: {
            slideNumber: {
                type: Type.INTEGER,
                description: 'The slide number, starting from 1.'
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
        }
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

    return res.status(200).json(parsedResult);

  } catch (error) {
    console.error("Error in serverless function:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return res.status(500).json({ error: `Failed to generate script: ${errorMessage}` });
  }
}
