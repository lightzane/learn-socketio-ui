import { OverlayContainer } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  $dark = new BehaviorSubject(true);

  constructor(private overlayContainer: OverlayContainer) {
    this.initTheme();
  }

  private initTheme(): void {
    const theme = localStorage.getItem('theme') || 'dark';
    const isDark = theme === 'dark' ? true : false;
    this.$dark.next(isDark);
    this.applyDarkDialog();
  }

  /**
   * Apply dark theme to mat-dialog and snackbar components
   * And also save `dark` to localStorage
   */
  private applyDarkDialog(): void {
    if (this.$dark.getValue()) {
      this.overlayContainer.getContainerElement().classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      this.overlayContainer.getContainerElement().classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }

  toggleTheme(): void {
    const dark = !this.$dark.getValue();
    this.$dark.next(dark);
    this.applyDarkDialog();
  }
}
