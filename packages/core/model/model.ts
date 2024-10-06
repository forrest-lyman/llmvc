export interface Model {
  name: string;
  capabilities: string[];
  settings: Record<string, any>;
  limits: {
    maxContextLength?: number;
    maxPromptLength?: number;
    maxAudioDuration?: string;
  };
}
