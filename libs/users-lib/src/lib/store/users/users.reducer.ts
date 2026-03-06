import { createFeature, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { User } from '../../models/user.model';
import { UsersActions } from './users.actions';

export interface State extends EntityState<User> {
    loading: boolean;
    error: string | null;
    filter: string;
    pageSize: number;
    pageIndex: number;
    columnFilters: Record<string, string>;
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState: State = adapter.getInitialState({
    loading: false,
    error: null,
    filter: '',
    pageSize: 3,
    pageIndex: 0,
    columnFilters: {},
});

export const usersFeature = createFeature({
    name: 'users',
    reducer: createReducer(
        initialState,
        on(UsersActions.loadUsers, (state) => ({ ...state, loading: true, error: null })),
        on(UsersActions.loadUsersSuccess, (state, { users }) =>
            adapter.setAll(users, { ...state, loading: false })
        ),
        on(UsersActions.loadUsersFailure, (state, { error }) => ({ ...state, loading: false, error })),
        on(UsersActions.setFilter, (state, { filter }) => ({ ...state, filter, pageIndex: 0 })),
        on(UsersActions.setPageSize, (state, { pageSize }) => ({ ...state, pageSize, pageIndex: 0 })),
        on(UsersActions.setPageIndex, (state, { pageIndex }) => ({ ...state, pageIndex })),
        on(UsersActions.setColumnFilter, (state, { column, value }) => ({
            ...state,
            columnFilters: { ...state.columnFilters, [column]: value },
            pageIndex: 0
        })),
        on(UsersActions.resetFilters, (state) => ({
            ...state,
            filter: '',
            columnFilters: {},
            pageIndex: 0
        })),
    ),
});

export const {
    name,
    reducer,
    selectUsersState,
    selectFilter,
    selectLoading,
    selectError,
    selectPageSize,
    selectPageIndex,
    selectColumnFilters
} = usersFeature;

export const { selectAll } = adapter.getSelectors(selectUsersState);
