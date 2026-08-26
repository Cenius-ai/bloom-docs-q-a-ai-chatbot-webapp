import { Message } from './message.model';

export interface Conversation {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: Message[];
}

export function createConversation(title?: string): Conversation {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    title: title ?? 'New conversation',
    createdAt: now,
    updatedAt: now,
    messages: [],
  };
}
