import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConversationService } from '../../services/conversation.service';
import { Conversation } from '../../models/conversation.model';

@Component({
  selector: 'app-conversations',
  standalone: true,
  imports: [RouterModule, DatePipe, FormsModule],
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.scss'],
})
export class ConversationsComponent {
  private readonly convService = inject(ConversationService);
  readonly conversations = this.convService.conversations;
  readonly activeId = this.convService.activeId;
  readonly searchQuery = signal('');

  get filteredConversations(): Conversation[] {
    return this.convService.search(this.searchQuery());
  }

  selectConversation(id: string): void {
    this.convService.setActive(id);
  }

  newConversation(): void {
    this.convService.create();
  }

  deleteConversation(event: Event, id: string): void {
    event.stopPropagation();
    event.preventDefault();
    this.convService.delete(id);
  }
}
