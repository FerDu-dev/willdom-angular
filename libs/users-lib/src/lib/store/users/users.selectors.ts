import { createSelector } from '@ngrx/store';
import { usersFeature, selectAll } from './users.reducer';

export const {
    selectFilter,
    selectPageSize,
    selectPageIndex,
    selectColumnFilters
} = usersFeature;

export const selectFilteredUsers = createSelector(
    selectAll,
    selectFilter,
    selectColumnFilters,
    (users, filter, columnFilters) => {
        let filtered = users;

        // Global text filter
        if (filter) {
            const lowerFilter = filter.toLowerCase();
            filtered = filtered.filter(user =>
                user.name.toLowerCase().includes(lowerFilter) ||
                user.username.toLowerCase().includes(lowerFilter) ||
                user.email.toLowerCase().includes(lowerFilter) ||
                user.company.name.toLowerCase().includes(lowerFilter)
            );
        }

        // Column specific filters
        Object.entries(columnFilters).forEach(([column, value]) => {
            if (value) {
                const lowerValue = value.toLowerCase();
                filtered = filtered.filter(user => {
                    const cellValue = column === 'company' ? user.company.name : (user as any)[column];
                    return String(cellValue).toLowerCase().includes(lowerValue);
                });
            }
        });

        return filtered;
    }
);

export const selectTotalCount = createSelector(
    selectFilteredUsers,
    (filtered) => filtered.length
);

export const selectPaginatedUsers = createSelector(
    selectFilteredUsers,
    selectPageSize,
    selectPageIndex,
    (filtered, pageSize, pageIndex) => {
        const start = pageIndex * pageSize;
        return filtered.slice(start, start + pageSize);
    }
);

export const selectTotalPages = createSelector(
    selectTotalCount,
    selectPageSize,
    (totalCount, pageSize) => Math.ceil(totalCount / pageSize) || 1
);
