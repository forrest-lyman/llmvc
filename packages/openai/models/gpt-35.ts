import {Model} from '../../core/model/model';

export class GPT35 implements Model{
  name: string = "gpt-3.5";
  capabilities: string[] = ["chat", "completion"];
  settings: Record<string, any> = {
    model: "gpt-3.5",
    temperature: 0.7,
    max_tokens: 4096,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    stream: false
  };
  limits: { maxContextLength: number } = {
    maxContextLength: 4096
  };
}
