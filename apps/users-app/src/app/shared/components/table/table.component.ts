import { Component, Input, Output, EventEmitter, ContentChildren, QueryList, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiTable } from '@taiga-ui/addon-table';
import { TuiIcon, TuiDropdownDirective, TuiTextfield } from '@taiga-ui/core';

export interface TableColumn {
    key: string;
    label: string;
    sortable?: boolean;
    filterable?: boolean;
    type?: 'text' | 'image' | 'custom';
}

@Component({
    selector: 'app-table',
    standalone: true,
    imports: [CommonModule, TuiTable, TuiIcon, TuiDropdownDirective, TuiTextfield],
    template: `
    <table tuiTable class="premium-table">
      <thead>
        <tr tuiThGroup>
          @for (col of columns; track col.key) {
            <th tuiTh [sticky]="false">
              <div class="header-content" 
                   [tuiDropdown]="col.filterable ? filterTemplate : null"
                   [style.cursor]="col.filterable ? 'pointer' : 'default'">
                <span>{{ col.label }}</span>
                @if (col.filterable) {
                  <tui-icon icon="@tui.filter" class="filter-indicator"></tui-icon>
                }
              </div>

              <ng-template #filterTemplate>
                <div class="filter-popover">
                  <input 
                    tuiTextfield 
                    (input)="onFilterChange(col.key, $event)"
                    [placeholder]="'Filter ' + col.label"
                  >
                </div>
              </ng-template>
            </th>
          }
          @if (showActions) {
            <th tuiTh [sticky]="false">Actions</th>
          }
        </tr>
      </thead>
      
      <tbody tuiTbody>
        @for (item of data; track trackByFn(item)) {
          <tr tuiTr class="table-row" (click)="onRowClick(item)">
            @for (col of columns; track col.key) {
              <td tuiTd>
                @if (col.type === 'image') {
                   <div class="image-cell">
                      <img [src]="item[col.key]" alt="Cell Image" class="avatar-img">
                   </div>
                } @else if (col.type === 'custom') {
                  <ng-container *ngTemplateOutlet="getTemplate(col.key); context: { $implicit: item }"></ng-container>
                } @else {
                  <span class="text-val">{{ getNestedValue(item, col.key) }}</span>
                }
              </td>
            }
            @if (showActions) {
              <td tuiTd class="actions-cell">
                <button class="icon-btn" (click)="$event.stopPropagation()">
                  <tui-icon icon="@tui.more-vertical"></tui-icon>
                </button>
              </td>
            }
          </tr>
        }
      </tbody>
    </table>
  `,
    styles: [`
    .premium-table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0 8px;

      th {
        text-align: left;
        padding: 16px 12px;
        color: var(--text-muted);
        font-weight: 600;
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);

        .header-content {
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s ease;
          width: fit-content;

          &:hover {
            color: white;
            .filter-indicator {
              opacity: 1;
              transform: scale(1);
            }
          }

          .filter-indicator {
            font-size: 0.9rem;
            opacity: 0;
            transform: scale(0.8);
            transition: all 0.2s ease;
            color: var(--accent-primary);
          }
        }
      }

      .table-row {
        transition: all 0.2s ease;
        cursor: pointer;

        &:hover {
          background: rgba(255, 255, 255, 0.02);
          transform: scale(1.002);
        }

        td {
          padding: 16px 12px;
        }
      }
    }

    .image-cell {
      display: flex;
      align-items: center;
      gap: 12px;
      .avatar-img {
        width: 40px;
        height: 40px;
        border-radius: 12px;
        object-fit: cover;
        border: 2px solid rgba(255, 255, 255, 0.1);
      }
    }

    .text-val {
       color: rgba(255, 255, 255, 0.9);
       font-weight: 500;
    }

    .icon-btn {
      background: transparent;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
      transition: color 0.2s ease;

      &:hover {
        color: white;
      }
    }

    .filter-popover {
      padding: 12px;
      background: #25262b;
      border-radius: 8px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.5);
      border: 1px solid rgba(255,255,255,0.1);

      input {
        background: rgba(255,255,255,0.05);
        color: white;
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 4px;
        padding: 4px 8px;
        font-size: 0.85rem;
        outline: none;
        &:focus {
          border-color: var(--accent-primary);
        }
      }
    }
  `]
})
export class TableComponent {
    @Input() data: any[] = [];
    @Input() columns: TableColumn[] = [];
    @Input() showActions = true;
    @Input() customTemplates: { [key: string]: TemplateRef<any> } = {};

    @Output() rowClick = new EventEmitter<any>();
    @Output() filterChange = new EventEmitter<{ column: string, value: string }>();

    trackByFn(item: any) {
        return item.id || item;
    }

    onRowClick(item: any) {
        this.rowClick.emit(item);
    }

    onFilterChange(column: string, event: Event) {
        const value = (event.target as HTMLInputElement).value;
        this.filterChange.emit({ column, value });
    }

    getTemplate(key: string): TemplateRef<any> | null {
        return this.customTemplates[key] || null;
    }

    getNestedValue(obj: any, path: string): any {
        return path.split('.').reduce((acc, part) => acc && acc[part], obj);
    }
}
