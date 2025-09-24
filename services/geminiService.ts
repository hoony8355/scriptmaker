import { SingleSlideScriptGenerationParams, SlideScript } from "../types";

export const generateScript = async (params: SingleSlideScriptGenerationParams): Promise<SlideScript> => {
    try {
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        });

        if (!response.ok) {
            // Try to get a more detailed error message from the server response
            const errorText = await response.text();
            throw new Error(`서버 응답 오류 (상태 코드: ${response.status}): ${errorText}`);
        }

        const result = await response.json();

        if (typeof result.script !== 'string' || typeof result.estimatedSpeakingTime !== 'number') {
            throw new Error("API로부터 받은 JSON 구조가 올바르지 않습니다.");
        }

        // The server returns the script and time, we just add the slide number back in.
        return {
            slideNumber: params.slideNumber,
            script: result.script,
            estimatedSpeakingTime: Math.round(result.estimatedSpeakingTime)
        };

    } catch (error) {
        console.error(`Error calling /api/generate for slide ${params.slideNumber}:`, error);
        
        let errorMessage = `슬라이드 ${params.slideNumber} 스크립트 생성 중 API 통신 오류가 발생했습니다.`;
        if (error instanceof Error) {
            errorMessage += ` 세부 정보: ${error.message}`;
        }
        
        throw new Error(errorMessage);
    }
};
