import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiPagination } from '@taiga-ui/kit';

@Component({
    selector: 'app-pagination',
    standalone: true,
    imports: [CommonModule, TuiPagination],
    template: `
    <div class="pagination-container">
      @if (showPageSize) {
        <div class="page-size-selector">
          <span class="label">Show</span>
          <select 
            class="size-select" 
            [value]="pageSize" 
            (change)="onPageSizeChange($event)"
          >
            @for (size of pageSizeOptions; track size) {
              <option [value]="size">{{ size }}</option>
            }
          </select>
        </div>
      }
      
      <tui-pagination 
        class="pagination-arrows" 
        [length]="length"
        [index]="index" 
        (indexChange)="onIndexChange($event)"
      ></tui-pagination>
    </div>
  `,
    styles: [`
    .pagination-container {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .page-size-selector {
      display: flex;
      align-items: center;
      gap: 8px;

      .label {
        font-size: 0.85rem;
        color: var(--text-muted);
        font-weight: 500;
      }

      .size-select {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: white;
        padding: 4px 8px;
        border-radius: 6px;
        outline: none;
        cursor: pointer;
        font-size: 0.85rem;
        transition: all 0.2s ease;

        &:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.2);
        }
      }
    }

    .pagination-arrows {
      --tui-pagination-button-size: 32px;
      --tui-primary: white;
      
      :host ::ng-deep {
        button {
          background: transparent !important;
          color: rgba(255, 255, 255, 0.4) !important;
          font-weight: 500;
          transition: all 0.2s ease;
          border: none !important;

          &:hover {
            color: rgba(255, 255, 255, 0.8) !important;
            background: rgba(255, 255, 255, 0.05) !important;
          }

          &[data-tui-pagination-active="true"],
          &[aria-current="page"] {
            background: transparent !important;
            color: white !important;
            font-weight: 800 !important;
            text-decoration: underline !important;
            text-underline-offset: 6px;
            text-decoration-thickness: 2px !important;
          }
        }
      }
    }
  `]
})
export class PaginationComponent {
    @Input() length = 1;
    @Input() index = 0;
    @Input() pageSize = 3;
    @Input() pageSizeOptions = [3, 5, 10];
    @Input() showPageSize = true;

    @Output() indexChange = new EventEmitter<number>();
    @Output() pageSizeChange = new EventEmitter<number>();

    onIndexChange(newIndex: number) {
        this.indexChange.emit(newIndex);
    }

    onPageSizeChange(event: Event) {
        const value = (event.target as HTMLSelectElement).value;
        this.pageSizeChange.emit(Number(value));
    }
}
