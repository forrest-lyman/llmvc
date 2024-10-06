import {Model} from '../../core/model/model';

export class Whisper implements Model{
  name: string = "whisper";
  capabilities: string[] = ["speech"];
  settings: Record<string, any> = {
    model: "whisper-1",
    file: "",
    language: "en",
    prompt: ""
  };
  limits: { maxAudioDuration: string } = {
    maxAudioDuration: "2 hours"
  };
}
