import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI, Type } from '@google/genai';
import { SingleSlideScriptGenerationParams } from '../types';

const generateScriptPrompt = (params: SingleSlideScriptGenerationParams): string => {
    return `당신은 뛰어난 발표 스크립트 작성 전문가입니다. 주어진 정보를 바탕으로 특정 슬라이드에 대한 발표 스크립트를 작성해야 합니다.

    **발표 정보:**
    - **전체 발표 목표:** ${params.intention}
    - **현재 슬라이드:** 전체 ${params.totalSlides}장 중 ${params.slideNumber}번째 슬라이드

    **현재 슬라이드 내용:**
    \`\`\`
    ${params.slideText}
    \`\`\`

    **스크립트 작성 지침:**
    1.  **내용 분석:** 슬라이드 내용을 분석하고 전체 발표 목표 안에서 이 슬라이드의 역할을 파악하세요.
    2.  **스크립트 생성:** 청중이 이해하기 쉽고 몰입할 수 있는 스크립트를 작성하세요.
    3.  **톤앤매너 및 분량 준수:**
        -   **톤앤매너:** ${params.tone}
        -   **분량:** ${params.length}
    4.  **예상 발표 시간 계산:** 작성된 스크립트를 자연스러운 속도로 발표할 때 예상되는 시간을 초(second) 단위의 숫자로 계산하세요.
    5.  **출력 형식:** 반드시 아래와 같은 형식의 JSON 객체만 반환해야 합니다. 다른 설명이나 \`\`\`json 같은 마크다운은 절대 포함하지 마세요.
    
    **JSON 출력 형식:**
    {
      "script": "생성된 발표 스크립트 내용",
      "estimatedSpeakingTime": 45
    }`;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    if (!process.env.API_KEY) {
        console.error('FATAL: API_KEY environment variable is not set.');
        return res.status(500).json({ error: 'Server configuration error: API key is missing.' });
    }

    try {
        const params = req.body as SingleSlideScriptGenerationParams;
        
        // Basic validation
        if (!params || !params.slideText || !params.intention) {
            return res.status(400).json({ error: 'Invalid request body. Missing required parameters.' });
        }

        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const prompt = generateScriptPrompt(params);

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                // Critical optimization to prevent serverless function timeouts
                thinkingConfig: { thinkingBudget: 0 },
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        script: {
                            type: Type.STRING,
                            description: 'The generated presentation script for the slide, in Korean.'
                        },
                        estimatedSpeakingTime: {
                            type: Type.NUMBER,
                            description: 'The estimated speaking time for the script in seconds.'
                        }
                    },
                    required: ["script", "estimatedSpeakingTime"]
                }
            }
        });

        if (!response.text) {
             console.error("Gemini API returned an empty response text.");
             return res.status(500).json({ error: "AI model returned an empty response." });
        }
        
        const jsonString = response.text.trim();
        const result = JSON.parse(jsonString);

        return res.status(200).json(result);

    } catch (error) {
        console.error('Error in /api/generate handler:', error);
        
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
        return res.status(500).json({
            error: 'Failed to generate script due to an internal server error.',
            details: errorMessage
        });
    }
}
