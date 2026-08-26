import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MockDataService } from '../../services/mock-data.service';
import { Document } from '../../models/document.model';

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss'],
})
export class DocumentsComponent {
  private readonly mockData = inject(MockDataService);
  readonly documents = signal<Document[]>(this.mockData.getDocuments());
  readonly searchQuery = signal('');

  get filteredDocuments(): Document[] {
    const q = this.searchQuery().toLowerCase().trim();
    if (!q) return this.documents();
    return this.documents().filter(
      d => d.title.toLowerCase().includes(q) || d.content.toLowerCase().includes(q) || d.category.toLowerCase().includes(q)
    );
  }

  get categories(): string[] {
    return [...new Set(this.documents().map(d => d.category))].sort();
  }

  onSearch(event: Event): void {
    this.searchQuery.set((event.target as HTMLInputElement).value);
  }
}
