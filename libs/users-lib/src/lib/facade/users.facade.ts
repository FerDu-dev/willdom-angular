import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
    UsersActions,
    selectFilter,
    selectUsersLoading,
    selectUsersError,
    selectFilteredUsers,
    selectPaginatedUsers,
    selectPageSize,
    selectPageIndex,
    selectTotalCount,
    selectTotalPages,
    selectColumnFilters
} from '@willdom-test/users-lib';

@Injectable({
    providedIn: 'root'
})
export class UsersFacade {
    private readonly store = inject(Store);

    // Users Selectors
    users$ = this.store.select(selectFilteredUsers);
    paginatedUsers$ = this.store.select(selectPaginatedUsers);
    loadingUsers$ = this.store.select(selectUsersLoading);
    usersError$ = this.store.select(selectUsersError);
    filter$ = this.store.select(selectFilter);
    pageSize$ = this.store.select(selectPageSize);
    pageIndex$ = this.store.select(selectPageIndex);
    totalCount$ = this.store.select(selectTotalCount);
    columnFilters$ = this.store.select(selectColumnFilters);
    totalPages$ = this.store.select(selectTotalPages);

    // Users Actions
    loadUsers(): void {
        this.store.dispatch(UsersActions.loadUsers());
    }

    setFilter(filter: string): void {
        this.store.dispatch(UsersActions.setFilter({ filter }));
    }

    setPageSize(pageSize: number): void {
        this.store.dispatch(UsersActions.setPageSize({ pageSize }));
    }

    setPageIndex(pageIndex: number): void {
        this.store.dispatch(UsersActions.setPageIndex({ pageIndex }));
    }

    setColumnFilter(column: string, value: string): void {
        this.store.dispatch(UsersActions.setColumnFilter({ column, value }));
    }

    resetFilters(): void {
        this.store.dispatch(UsersActions.resetFilters());
    }
}
