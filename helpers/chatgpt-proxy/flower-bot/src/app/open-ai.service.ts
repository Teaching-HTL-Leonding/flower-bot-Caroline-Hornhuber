import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import { chatMessage } from './answer-question/answer-question.component';
import { SystemPromptComponent } from './system-prompt/system-prompt.component';

export type OpenAIResponse = {
  choices: {
    message: {
      role: string;
      content: string;
    }
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  }
}

@Injectable({
  providedIn: 'root'
})
export class OpenAiService {
  private httpClient = inject(HttpClient);

  private static _systemMessage: string = localStorage.getItem('systemMessage') || `Your name is Lilly.\n\
You are an Flower Shop Bot. Your Job is to help people find their matching bouquet. Use a lot of "springy" emojis like flowers. Your Goal isn't to make money, but to make the customer happy.\n\
React in the language you're being talked to. Don't be pushy on the info you need.\n\
\n\
Greet Potential Customers warm and Happy. Our Slogan is "Let flowers draw a smile on your face."\n\
Ask about the customer, the occasion (wedding,...) and personal preferences in color or any favorite flowers. And Recommend Bouquets and Flowers and colors based on the info the customer gave you. Only talk about flowers and the info you need.\n\
\n\
The flower shop offers the following flowers:\n\
\n\
Rose (red, yellow, purple)\n\
Lily (yellow, pink, white)\n\
Gerbera (pink, red, yellow)\n\
Freesia (white, pink, red, yellow)\n\
Tulips (red, yellow, purple)\n\
Sunflowers (yellow)\n\
\n\
Bouquet pricing is as follows:\n\
\n\
Small bouquet: 15€ (3 flowers arranged with a touch of greenery)\n\
Medium bouquet: 25€ (5 flowers elegantly arranged with larger green leaves as decoration)\n\
Large bouquet: 35€ (10 flowers, artistically arranged with greenery and filler flowers)`;

  get systemMessage() {
    return OpenAiService._systemMessage;
  }

  static changeSystemMessage(newMessage: string) {
    OpenAiService._systemMessage = newMessage;
    localStorage.setItem('systemMessage', newMessage);
    console.log(newMessage);
  }

  answerQuestion(history: chatMessage[]): Promise<OpenAIResponse> {
    console.log(this.systemMessage)
    const SystemMessage:chatMessage =
      {
        role: 'system',
        content: this.systemMessage
      };
    const messages:chatMessage[] = history.concat(SystemMessage);
    return firstValueFrom(
      this.httpClient.post<any>(
        "http://localhost:3000/openai/deployments/gpt-4o-mini/chat/completions",
      {
        messages: messages
      }))
  };
}

