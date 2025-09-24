
export enum Tone {
  FORMAL = '격식체 (Formal & Professional)',
  COLLOQUIAL = '구어체 (Conversational)',
  CONCISE = '담백하고 간결하게 (Simple & Concise)',
  PASSIONATE = '열정적이고 설득력있게 (Passionate & Persuasive)',
}

export enum ScriptLength {
  SHORT = '짧게 (1-2 sentences per slide)',
  MEDIUM = '중간 (3-4 sentences per slide)',
  LONG = '길게 (5+ sentences per slide)',
}

export interface ScriptGenerationParams {
  slideContent: string;
  intention: string;
  tone: Tone;
  length: ScriptLength;
}

export interface SlideScript {
  slideNumber: number;
  script: string;
}
