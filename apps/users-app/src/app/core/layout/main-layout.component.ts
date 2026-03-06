import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';

@Component({
    selector: 'app-main-layout',
    standalone: true,
    imports: [CommonModule, RouterModule, SidebarComponent],
    template: `
    <div class="layout-container">
      <app-sidebar></app-sidebar>
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
    styles: [`
    .layout-container {
      display: flex;
      min-height: 100vh;
      background: #0f1014;
    }

    .main-content {
      flex: 1;
      margin-left: 280px; /* Width of sidebar */
      padding: 0;
      min-height: 100vh;
      overflow-x: hidden;
    }
  `]
})
export class MainLayoutComponent { }
