export interface PagedResult<T> {
    items: T[];
    totalItems: number;
    totalPages: number;
    page: number;
    size: number;
}
