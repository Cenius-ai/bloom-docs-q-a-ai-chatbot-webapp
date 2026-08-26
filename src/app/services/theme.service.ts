import { Injectable, signal, effect } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

const THEME_KEY = 'bloom-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly mode = signal<ThemeMode>('dark');

  constructor() {
    this.hydrate();
    effect(() => {
      document.documentElement.setAttribute('data-theme', this.mode());
    });
  }

  private hydrate(): void {
    const stored = localStorage.getItem(THEME_KEY) as ThemeMode | null;
    if (stored === 'light' || stored === 'dark') {
      this.mode.set(stored);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.mode.set(prefersDark ? 'dark' : 'light');
    }
    document.documentElement.setAttribute('data-theme', this.mode());
  }

  toggle(): void {
    const next: ThemeMode = this.mode() === 'dark' ? 'light' : 'dark';
    this.mode.set(next);
    localStorage.setItem(THEME_KEY, next);
  }

  setMode(mode: ThemeMode): void {
    this.mode.set(mode);
    localStorage.setItem(THEME_KEY, mode);
  }
}
