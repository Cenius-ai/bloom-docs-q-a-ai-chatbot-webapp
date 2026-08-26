import { Component, inject, Input, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConversationService } from '../../services/conversation.service';
import { Conversation } from '../../models/conversation.model';
import { ChatMessageComponent } from '../../components/chat-message/chat-message.component';

@Component({
  selector: 'app-conversation-detail',
  standalone: true,
  imports: [FormsModule, RouterModule, ChatMessageComponent],
  templateUrl: './conversation-detail.component.html',
  styleUrls: ['./conversation-detail.component.scss'],
})
export class ConversationDetailComponent implements OnInit, OnDestroy, AfterViewChecked {
  @Input() id!: string;
  @ViewChild('scrollAnchor') private scrollAnchor!: ElementRef<HTMLDivElement>;

  private readonly convService = inject(ConversationService);
  readonly activeConversation = this.convService.activeConversation;
  readonly userInput = signal('');
  readonly sending = signal(false);

  private needsScroll = false;

  ngOnInit(): void {
    this.convService.setActive(this.id);
  }

  ngOnDestroy(): void {
    // keep active but don't clear
  }

  ngAfterViewChecked(): void {
    if (this.needsScroll) {
      this.scrollToBottom();
    }
  }

  private scrollToBottom(): void {
    this.needsScroll = false;
    if (this.scrollAnchor) {
      this.scrollAnchor.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  sendMessage(): void {
    const text = this.userInput().trim();
    if (!text || this.sending()) return;

    this.sending.set(true);
    this.userInput.set('');

    this.convService.sendMessage(this.id, text);

    setTimeout(() => {
      this.sending.set(false);
      this.needsScroll = true;
    }, 300);
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }
}
