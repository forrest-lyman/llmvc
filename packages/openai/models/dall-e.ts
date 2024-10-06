import {Model} from '../../core/model/model';

export class DallE implements Model{
  name: string = "dall-e";
  capabilities: string[] = ["image"];
  settings: Record<string, any> = {
    prompt: "",
    size: "1024x1024",
    n: 1
  };
  limits: { maxPromptLength: number } = {
    maxPromptLength: 1000
  };
}
