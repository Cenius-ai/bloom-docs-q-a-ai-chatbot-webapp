export interface Document {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
}

export interface DocumentMatch {
  documentId: string;
  title: string;
  excerpt: string;
  score: number;
}
