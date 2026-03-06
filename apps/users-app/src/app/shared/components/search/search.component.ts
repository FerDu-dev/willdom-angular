import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TuiIcon } from '@taiga-ui/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-search',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, TuiIcon],
    template: `
    <div class="inner-search">
      <tui-icon icon="@tui.search"></tui-icon>
      <input 
        type="text" 
        [formControl]="searchControl" 
        [placeholder]="placeholder"
      >
    </div>
  `,
    styles: [`
    .inner-search {
      display: flex;
      align-items: center;
      gap: 12px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      padding: 0 16px;
      height: 44px;
      width: 320px;
      transition: all 0.3s ease;

      &:focus-within {
        background: rgba(255, 255, 255, 0.06);
        border-color: var(--accent-primary);
        box-shadow: 0 0 0 4px rgba(var(--accent-primary-rgb), 0.1);
      }

      tui-icon {
        color: var(--text-muted);
        font-size: 1.25rem;
      }

      input {
        background: transparent;
        border: none;
        color: white;
        font-size: 0.95rem;
        width: 100%;
        outline: none;

        &::placeholder {
          color: rgba(255, 255, 255, 0.3);
        }
      }
    }
  `]
})
export class SearchComponent implements OnInit, OnDestroy {
    @Input() placeholder = 'Search...';
    @Input() initialValue = '';
    @Output() search = new EventEmitter<string>();

    searchControl = new FormControl('');
    private destroy$ = new Subject<void>();

    ngOnInit() {
        this.searchControl.setValue(this.initialValue, { emitEvent: false });
        this.searchControl.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            takeUntil(this.destroy$)
        ).subscribe(value => {
            this.search.emit(value || '');
        });
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
