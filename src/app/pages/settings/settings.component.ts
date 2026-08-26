import { Component, inject } from '@angular/core';
import { ThemeService, ThemeMode } from '../../services/theme.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  readonly themeService = inject(ThemeService);
  readonly mode = this.themeService.mode;

  setTheme(mode: ThemeMode): void {
    this.themeService.setMode(mode);
  }

  purgeData(): void {
    if (confirm('Delete all conversations and reset the app? This cannot be undone.')) {
      localStorage.removeItem('bloom-conversations');
      localStorage.removeItem('bloom-documents');
      localStorage.removeItem('bloom-seeded');
      window.location.reload();
    }
  }
}
