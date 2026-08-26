import { Component, inject, Output, EventEmitter, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ConversationService } from '../../services/conversation.service';
import { Conversation } from '../../models/conversation.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, DatePipe],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Output() navigate = new EventEmitter<void>();

  private readonly convService = inject(ConversationService);
  readonly conversations = this.convService.conversations;
  readonly activeId = this.convService.activeId;
  readonly searchQuery = signal('');

  get filteredConversations(): Conversation[] {
    return this.convService.search(this.searchQuery());
  }

  selectConversation(id: string): void {
    this.convService.setActive(id);
    this.navigate.emit();
  }

  newConversation(): void {
    this.convService.create();
    this.navigate.emit();
  }

  onSearchInput(event: Event): void {
    this.searchQuery.set((event.target as HTMLInputElement).value);
  }
}
