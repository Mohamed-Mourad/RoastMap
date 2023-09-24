import { Injectable, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(@Inject('WINDOW') private window: Window) { }

  setSessionValue(key: string, value: string): void {
    this.window.sessionStorage.setItem(key, value);
  }

  getSessionValue(key: string): string | null {
    return this.window.sessionStorage.getItem(key);
  }

  removeSessionValue(key: string): void {
    this.window.sessionStorage.removeItem(key);
  }
}
