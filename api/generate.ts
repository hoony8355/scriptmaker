import { GoogleGenAI } from "@google/genai";
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { SingleSlideScriptGenerationParams } from '../types';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const params = req.body as SingleSlideScriptGenerationParams;
        
        if (!process.env.API_KEY) {
            console.error('API_KEY is not set');
            return res.status(500).json({ error: 'Server configuration error: API key not found.' });
        }

        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

        const { slideNumber, slideText, totalSlides, intention, tone, length } = params;

        const prompt = `
            You are an expert presentation scriptwriter.
            Your task is to generate a script for a single slide of a presentation.
            The final output MUST be a valid JSON object and nothing else. Do not add any introductory text, markdown formatting, code block syntax, or explanations.

            Presentation Context:
            - Overall Goal/Intention: ${intention}
            - Total Slides: ${totalSlides}

            Current Slide Details:
            - Slide Number: ${slideNumber} of ${totalSlides}
            - Slide Content (raw text): "${slideText}"

            Instructions:
            1. Write a script for this slide based on its content and the overall presentation goal.
            2. The tone of the script must be: ${tone}.
            3. The length of the script should be: ${length}.
            4. Calculate the estimated speaking time for the generated script in seconds, assuming a moderate speaking pace (around 150 words per minute).
            5. Structure your response as a valid JSON object with the following keys: "script" (string) and "estimatedSpeakingTime" (number).

            Example of the required JSON output format:
            {
              "script": "This is the generated script for the slide...",
              "estimatedSpeakingTime": 45
            }

            Now, generate the JSON output for slide ${slideNumber}.
        `;

        const model = "gemini-2.5-flash";
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                thinkingConfig: { thinkingBudget: 0 },
            },
        });

        if (!response.text) {
            throw new Error('AI model returned an empty response.');
        }

        let resultJson;
        try {
            const jsonString = response.text.substring(response.text.indexOf('{'), response.text.lastIndexOf('}') + 1);
            resultJson = JSON.parse(jsonString);
        } catch (parseError) {
            console.error('Failed to parse JSON from AI response:', parseError);
            console.error('Original AI response text:', response.text);
            throw new Error('AI response was not valid JSON.');
        }
        
        const scriptResult = {
            script: resultJson.script,
            estimatedSpeakingTime: resultJson.estimatedSpeakingTime
        };
        
        if (typeof scriptResult.script !== 'string' || typeof scriptResult.estimatedSpeakingTime !== 'number') {
            throw new Error('The parsed JSON from AI response has an invalid structure.');
        }

        return res.status(200).json(scriptResult);

    } catch (error) {
        console.error('Error in generate handler:', error);
        const message = error instanceof Error ? error.message : 'An unknown server error occurred.';
        return res.status(500).json({ error: message });
    }
}
