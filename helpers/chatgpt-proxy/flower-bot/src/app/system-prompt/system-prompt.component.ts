import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OpenAiService } from '../open-ai.service';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-system-prompt',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './system-prompt.component.html',
  styleUrl: './system-prompt.component.css'
})


export class SystemPromptComponent {
  answer=signal('');
  submitSystemMessage() {
    OpenAiService.changeSystemMessage(this.answer.toString());
  }
}

