export interface Message {
  id: string;
  conversationId: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  sources?: Source[];
}

export interface Source {
  id: string;
  title: string;
  excerpt: string;
}

export function createMessage(
  conversationId: string,
  role: 'user' | 'assistant',
  content: string,
  sources?: Source[]
): Message {
  return {
    id: crypto.randomUUID(),
    conversationId,
    role,
    content,
    timestamp: new Date().toISOString(),
    sources: sources ?? (role === 'assistant' ? [] : undefined),
  };
}
