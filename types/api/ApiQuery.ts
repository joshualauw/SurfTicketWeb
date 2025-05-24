export interface ApiQuery {
    page?: number;
    size?: number;
    [key: `filterBy[${string}]`]: string | undefined;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
}
