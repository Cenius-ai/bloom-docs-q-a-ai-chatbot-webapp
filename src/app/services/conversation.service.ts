import { Injectable, signal } from '@angular/core';
import { Conversation, createConversation } from '../models/conversation.model';
import { Message, createMessage } from '../models/message.model';
import { MockDataService } from './mock-data.service';

const STORAGE_KEY = 'bloom-conversations';
const SEEDED_KEY = 'bloom-seeded';

@Injectable({ providedIn: 'root' })
export class ConversationService {
  readonly conversations = signal<Conversation[]>([]);
  readonly activeId = signal<string | null>(null);
  readonly activeConversation = signal<Conversation | null>(null);

  constructor(private readonly mockData: MockDataService) {
    this.hydrate();
  }

  private hydrate(): void {
    const seeded = localStorage.getItem(SEEDED_KEY);
    if (!seeded) {
      const seedConvs = this.mockData.getSeededConversations();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seedConvs));
      localStorage.setItem(SEEDED_KEY, 'true');
      this.conversations.set(seedConvs);
      return;
    }

    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed: Conversation[] = JSON.parse(raw);
        this.conversations.set(parsed);
      } catch {
        this.conversations.set([]);
      }
    }
  }

  private persist(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.conversations()));
  }

  getAll(): Conversation[] {
    return this.conversations();
  }

  getById(id: string): Conversation | undefined {
    return this.conversations().find(c => c.id === id);
  }

  create(): Conversation {
    const conv = createConversation();
    const updated = [...this.conversations(), conv];
    this.conversations.set(updated);
    this.persist();
    this.setActive(conv.id);
    return conv;
  }

  delete(id: string): void {
    const updated = this.conversations().filter(c => c.id !== id);
    this.conversations.set(updated);
    this.persist();
    if (this.activeId() === id) {
      const remaining = updated[updated.length - 1] ?? null;
      this.setActive(remaining?.id ?? null);
    }
  }

  setActive(id: string | null): void {
    this.activeId.set(id);
    if (id) {
      const conv = this.getById(id);
      this.activeConversation.set(conv ?? null);
    } else {
      this.activeConversation.set(null);
    }
  }

  sendMessage(conversationId: string, content: string): void {
    const convs = this.conversations();
    const idx = convs.findIndex(c => c.id === conversationId);
    if (idx === -1) return;

    const userMsg = createMessage(conversationId, 'user', content);

    const { content: aiContent, sources } = this.mockData.generateResponse(content);
    const assistantMsg = createMessage(conversationId, 'assistant', aiContent, sources);

    const updated = [...convs];
    const conv = { ...updated[idx] };
    conv.messages = [...conv.messages, userMsg, assistantMsg];
    conv.updatedAt = assistantMsg.timestamp;

    if (conv.messages.length === 2 && conv.title === 'New conversation') {
      conv.title = this.generateTitle(content);
    }

    updated[idx] = conv;
    this.conversations.set(updated);
    this.persist();
    this.setActive(conversationId);
  }

  search(query: string): Conversation[] {
    const lower = query.toLowerCase().trim();
    if (!lower) return this.conversations();
    return this.conversations().filter(c =>
      c.title.toLowerCase().includes(lower) ||
      c.messages.some(m => m.content.toLowerCase().includes(lower))
    );
  }

  private generateTitle(firstMessage: string): string {
    const cleaned = firstMessage.replace(/[?.,!]/g, '').trim();
    const words = cleaned.split(/\s+/).slice(0, 7);
    const title = words.join(' ');
    return title.length > 50 ? title.substring(0, 47) + '…' : title;
  }
}
