import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';

interface NavItem {
  label: string;
  icon: string;
  link: string;
  exact?: boolean;
  /** True for sections that don't have a route yet (kept visible so the roadmap is legible). */
  disabled?: boolean;
}

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLink,
    RouterLinkActive,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    MatTooltipModule,
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  /** Emitted when a nav link is clicked — used to close the sidenav on mobile. */
  @Output() linkClicked = new EventEmitter<void>();

  readonly navItems: NavItem[] = [
    { label: 'Tableau de bord', icon: 'dashboard', link: '/', exact: true },
    { label: 'Les contribuables', icon: 'groups', link: '/taxpayers' },
    { label: 'Les impôts', icon: 'receipt_long', link: '/taxes', disabled: true },
    { label: 'Les rapports', icon: 'bar_chart', link: '/reports', disabled: true },
  ];
}
