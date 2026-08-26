import { Component, Input, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Message } from '../../models/message.model';
import { ClipboardService } from '../../services/clipboard.service';

@Component({
  selector: 'app-chat-message',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss'],
})
export class ChatMessageComponent {
  @Input({ required: true }) message!: Message;

  private readonly clipboard = inject(ClipboardService);
  copied = false;

  formatContent(content: string): string[] {
    return content
      .split('\n')
      .map(p => p.trim())
      .filter(p => p.length > 0);
  }

  async copyContent(): Promise<void> {
    const ok = await this.clipboard.copy(this.message.content);
    if (ok) {
      this.copied = true;
      setTimeout(() => (this.copied = false), 2000);
    }
  }
}
