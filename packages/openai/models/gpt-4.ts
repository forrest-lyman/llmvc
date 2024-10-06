import {Model} from '../../core/model/model';

export class GPT4 implements Model {
  name: string = "gpt-4";
  capabilities: string[] = ["chat", "completion"];
  settings: Record<string, any> = {
    model: "gpt-4",
    temperature: 0.7,
    max_tokens: 8192,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    stream: false
  };
  limits: { maxContextLength: number } = {
    maxContextLength: 32000
  };
}
