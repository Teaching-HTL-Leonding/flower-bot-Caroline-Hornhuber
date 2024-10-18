import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OpenAiService } from '../open-ai.service';
import { MarkdownModule } from 'ngx-markdown';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';


@Component({
  selector: 'app-answer-question',
  standalone: true,
  imports: [FormsModule, MarkdownModule, CommonModule],
  templateUrl: './answer-question.component.html',
  styleUrl: './answer-question.component.css'
})
export class AnswerQuestionComponent {
  question = signal('');
  chatMessages= signal<chatMessage[]>([]);
  questionaAsked=0;

  private openAIService = inject(OpenAiService);

  resetBot(){
    this.questionaAsked=0;
    this.chatMessages.set([]);
  }

  async answerQuestion() {
    this.questionaAsked++;
    if(this.questionaAsked<=20){
      const newQuestion: chatMessage = {
        role: 'user',
        content: this.question()
      };
      this.chatMessages.update((messages) => [...messages, newQuestion]);
      this.question.set('');

      const response = await this.openAIService.answerQuestion(this.chatMessages());
      const newResponse: chatMessage = {
        role: 'assistant',
        content: response.choices[0].message.content
      };

      this.chatMessages.update((messages) => [...messages, newResponse]);
    }
    else{
      const newQuestion: chatMessage = {
        role: 'assistant',
        content: 'Too many requests! Please Start Over!'
      };
      this.chatMessages.update((messages) => [...messages, newQuestion]);
    }
  }
}

export type chatMessage = {
  role: string;
  content: string;
};
