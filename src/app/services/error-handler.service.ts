import { Injectable, ErrorHandler } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppErrorHandler implements ErrorHandler {
  handleError(error: unknown): void {
    const message = error instanceof Error ? error.message : String(error);
    console.error('[Bloom] Unhandled error:', message, error);
    // In a production app this would send to a monitoring service.
    // For our demo, we log and let the app continue gracefully.
  }
}
