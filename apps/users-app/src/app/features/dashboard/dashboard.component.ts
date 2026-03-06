import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiDialogService, TuiLoader, TuiIcon } from '@taiga-ui/core';
import { DetailModalComponent, DetailConfig } from '../../shared/components/detail-modal/detail-modal.component';
import { ExcelExportService, UsersFacade, User } from '@willdom-test/users-lib';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import { Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { TableComponent, TableColumn } from '../../shared/components/table/table.component';
import { SearchComponent } from '../../shared/components/search/search.component';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';

@Component({
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TuiLoader,
        TuiIcon,
        TableComponent,
        SearchComponent,
        PaginationComponent
    ],
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
    readonly facade = inject(UsersFacade);
    private readonly dialogs = inject(TuiDialogService);
    private readonly excelService = inject(ExcelExportService);
    private readonly destroy$ = new Subject<void>();

    pageSizeOptions = [3, 5, 10];

    users$ = this.facade.users$;
    paginatedUsers$ = this.facade.paginatedUsers$;
    loading$ = this.facade.loadingUsers$;
    totalCount$ = this.facade.totalCount$;
    pageIndex$ = this.facade.pageIndex$;
    pageSize$ = this.facade.pageSize$;
    totalPages$ = this.facade.totalPages$;

    tableColumns: TableColumn[] = [
        { key: 'avatar', label: '', type: 'custom' },
        { key: 'name', label: 'Name', filterable: true },
        { key: 'username', label: 'Username', filterable: true, type: 'custom' },
        { key: 'email', label: 'Email', filterable: true },
        { key: 'company.name', label: 'Company', filterable: true },
        { key: 'phone', label: 'Phone' }
    ];

    ngOnInit(): void {
        this.facade.loadUsers();
    }

    onSearch(filter: string): void {
        this.facade.setFilter(filter);
    }

    onFilterChange({ column, value }: { column: string, value: string }): void {
        this.facade.setColumnFilter(column, value);
    }

    openDetail(user: User): void {
        const config: DetailConfig = {
            title: user.name,
            tagKey: 'username',
            descriptionKey: 'email',
            avatarKey: 'id',
            sections: [
                {
                    title: 'Contact Information',
                    rows: [
                        { label: 'Phone', key: 'phone' },
                        { label: 'Website', key: 'website', isLink: true, linkPrefix: 'http://' },
                        { label: 'Email', key: 'email' }
                    ]
                },
                {
                    title: 'Location Details',
                    rows: [
                        { label: 'Street', key: 'address.street' },
                        { label: 'Suite', key: 'address.suite' },
                        { label: 'City', key: 'address.city' },
                        { label: 'Zipcode', key: 'address.zipcode' }
                    ]
                },
                {
                    title: 'Company Info',
                    rows: [
                        { label: 'Name', key: 'company.name' },
                        { label: 'Slogan', key: 'company.catchPhrase', isItalic: true },
                        { label: 'Expertise', key: 'company.bs' }
                    ]
                }
            ]
        };

        this.dialogs.open(
            new PolymorpheusComponent(DetailModalComponent),
            {
                data: { data: user, config },
                dismissible: true,
                size: 'm'
            }
        ).pipe(takeUntil(this.destroy$)).subscribe();
    }

    exportData(): void {
        this.users$.pipe(take(1)).subscribe(users => {
            const dataToExport = users.map(u => ({
                Name: u.name,
                Username: u.username,
                Email: u.email,
                Company: u.company.name,
                Phone: u.phone,
                Website: u.website
            }));
            this.excelService.exportToExcel(dataToExport, 'Willdom_Users_Export');
        });
    }

    setPageSize(size: number): void {
        this.facade.setPageSize(size);
    }

    setPage(index: number): void {
        this.facade.setPageIndex(index);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
