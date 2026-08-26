import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MockDataService } from '../../services/mock-data.service';
import { Document } from '../../models/document.model';

interface DocSection {
  type: 'heading2' | 'heading3' | 'code' | 'text';
  content: string;
}

@Component({
  selector: 'app-document-detail',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.scss'],
})
export class DocumentDetailComponent implements OnInit {
  @Input() id!: string;

  private readonly mockData = inject(MockDataService);
  readonly document = signal<Document | null>(null);

  ngOnInit(): void {
    this.document.set(this.mockData.getDocument(this.id) ?? null);
  }

  parseContent(content: string): DocSection[] {
    const sections: DocSection[] = [];
    const blocks = content.split('\n\n');

    for (const block of blocks) {
      const trimmed = block.trim();
      if (!trimmed) continue;

      if (trimmed.startsWith('## ')) {
        sections.push({ type: 'heading2', content: trimmed.slice(3) });
      } else if (trimmed.startsWith('### ')) {
        sections.push({ type: 'heading3', content: trimmed.slice(4) });
      } else if (trimmed.startsWith('```')) {
        const lines = trimmed.split('\n');
        const codeLines = lines.slice(1).filter(l => l !== '```').join('\n');
        sections.push({ type: 'code', content: codeLines });
      } else {
        sections.push({ type: 'text', content: trimmed });
      }
    }

    return sections;
  }
}
