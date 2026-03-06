import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TuiIcon } from '@taiga-ui/core';
import { AuthFacade } from '@willdom-test/users-lib';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, TuiIcon],
  template: `
    <aside class="sidebar">
      <div class="sidebar-content">
        <div class="logo-section">
          <div class="logo-orb"></div>
          <h1>Willdom</h1>
        </div>

        <nav class="nav-links">
          <a 
            routerLink="/dashboard" 
            routerLinkActive="active" 
            class="nav-item"
          >
            <tui-icon icon="@tui.layout-dashboard"></tui-icon>
            <span>Dashboard</span>
          </a>
          <a 
            href="javascript:void(0)" 
            class="nav-item disabled"
          >
            <tui-icon icon="@tui.users"></tui-icon>
            <span>Team Members</span>
          </a>
          <a 
            href="javascript:void(0)" 
            class="nav-item disabled"
          >
            <tui-icon icon="@tui.briefcase"></tui-icon>
            <span>Projects</span>
          </a>
        </nav>
      </div>

      <div class="sidebar-footer">
        <button class="logout-btn" (click)="onLogout()">
          <tui-icon icon="@tui.log-out"></tui-icon>
          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  `,
  styles: [`
    .sidebar {
      width: 280px;
      height: 100vh;
      background: #15161a;
      border-right: 1px solid rgba(255, 255, 255, 0.05);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 32px 24px;
      position: fixed;
      left: 0;
      top: 0;
      z-index: 100;
      box-sizing: border-box;
    }

    .sidebar-content {
      display: flex;
      flex-direction: column;
    }

    .logo-section {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 48px;

      .logo-orb {
        width: 32px;
        height: 32px;
        background: linear-gradient(135deg, #6366f1, #a855f7);
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
      }

      h1 {
        margin: 0;
        font-size: 1.25rem;
        font-weight: 800;
        letter-spacing: -0.02em;
        background: linear-gradient(to right, #fff, #a1a1aa);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }

    .nav-links {
      display: flex;
      flex-direction: column;
      gap: 8px;

      .nav-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        border-radius: 12px;
        color: #71717a;
        text-decoration: none;
        font-weight: 500;
        transition: all 0.2s ease;

        tui-icon {
          font-size: 1.25rem;
        }

        &.active {
          background: rgba(99, 102, 241, 0.1);
          color: #818cf8;
        }

        &:hover:not(.disabled):not(.active) {
          background: rgba(255, 255, 255, 0.03);
          color: white;
        }

        &.disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
      }
    }

    .sidebar-footer {
      border-top: 1px solid rgba(255, 255, 255, 0.05);
      padding-top: 24px;
      margin-top: auto;
    }

    .logout-btn {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
      padding: 12px 16px;
      background: transparent;
      border: none;
      color: #ef4444;
      font-weight: 600;
      cursor: pointer;
      border-radius: 12px;
      transition: all 0.2s ease;
      font-size: 0.95rem;

      &:hover {
        background: rgba(239, 68, 68, 0.1);
      }

      tui-icon {
        font-size: 1.25rem;
      }
    }
  `]
})
export class SidebarComponent {
  private readonly authFacade = inject(AuthFacade);

  onLogout() {
    this.authFacade.logout();
  }
}
