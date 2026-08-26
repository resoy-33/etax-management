import { Component, computed, effect, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { filter, map, startWith } from 'rxjs';

import { Navbar } from './components/navbar/navbar';
import { Sidebar } from './components/sidebar/sidebar';

@Component({
  selector: 'app-root',
  imports: [Navbar, Sidebar, RouterOutlet, MatSidenavModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly router = inject(Router);

  private readonly isHandset = toSignal(
    this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.TabletPortrait])
      .pipe(map((result) => result.matches)),
    { initialValue: false }
  );

  /** True whenever the current route is /login, so the shell can hide the navbar/sidenav there. */
  readonly isLoginPage = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map((e) => e.urlAfterRedirects === '/login'),
      startWith(this.router.url === '/login')
    ),
    { initialValue: false }
  );

  /** On mobile the sidenav starts closed and overlays the content; on desktop it's always visible. */
  readonly sidenavMode = computed(() => (this.isHandset() ? 'over' : 'side'));
  readonly sidenavOpened = signal(true);

  constructor() {
    // Keep the sidenav open by default on desktop, closed by default on mobile,
    // and re-sync whenever the viewport crosses the breakpoint.
    effect(() => {
      this.sidenavOpened.set(!this.isHandset());
    });
  }

  toggleSidenav() {
    this.sidenavOpened.update((open) => !open);
  }

  closeIfMobile() {
    if (this.isHandset()) {
      this.sidenavOpened.set(false);
    }
  }

  get showMenuButton() {
    return this.isHandset();
  }
}
