import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/conversations',
    pathMatch: 'full',
  },
  {
    path: 'conversations',
    loadComponent: () =>
      import('./pages/conversations/conversations.component').then(m => m.ConversationsComponent),
  },
  {
    path: 'conversations/:id',
    loadComponent: () =>
      import('./pages/conversation-detail/conversation-detail.component').then(m => m.ConversationDetailComponent),
  },
  {
    path: 'documents',
    loadComponent: () =>
      import('./pages/documents/documents.component').then(m => m.DocumentsComponent),
  },
  {
    path: 'documents/:id',
    loadComponent: () =>
      import('./pages/document-detail/document-detail.component').then(m => m.DocumentDetailComponent),
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./pages/settings/settings.component').then(m => m.SettingsComponent),
  },
  {
    path: '**',
    redirectTo: '/conversations',
  },
];
