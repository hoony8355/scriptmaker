// FIX: The original content of this file was invalid. The service is now fully implemented to interact with the Gemini API as required by the application.
import { GoogleGenAI, Type } from "@google/genai";
import { SingleSlideScriptGenerationParams, SlideScript } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

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


export const generateScript = async (params: SingleSlideScriptGenerationParams): Promise<SlideScript> => {
    const prompt = generateScriptPrompt(params);

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
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
                }
            }
        });
        
        const jsonString = response.text.trim();
        const result = JSON.parse(jsonString);

        if (typeof result.script !== 'string' || typeof result.estimatedSpeakingTime !== 'number') {
            throw new Error("API로부터 받은 JSON 구조가 올바르지 않습니다.");
        }

        return {
            slideNumber: params.slideNumber,
            script: result.script,
            estimatedSpeakingTime: Math.round(result.estimatedSpeakingTime)
        };

    } catch (error) {
        console.error(`Error generating script for slide ${params.slideNumber}:`, error);
        
        let errorMessage = `슬라이드 ${params.slideNumber} 스크립트 생성 중 오류가 발생했습니다.`;
        if (error instanceof Error) {
            errorMessage += ` 세부 정보: ${error.message}`;
        }
        
        throw new Error(errorMessage);
    }
};
