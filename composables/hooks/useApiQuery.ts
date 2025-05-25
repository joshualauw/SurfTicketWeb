import type { ApiQuery } from "~/types/api/ApiQuery";
import type { TableFilter, TablePagination, TableSort } from "~/types/common/table";

export default function (pagination: TablePagination, sort: TableSort, filters: TableFilter) {
    const query: ApiQuery = { page: pagination.page, size: pagination.size };

    if (sort.key && sort.direction) {
        query.sortBy = sort.key;
        query.sortOrder = sort.direction;
    }

    if (filters) {
        for (const [key, value] of Object.entries(filters)) {
            query[`filterBy[${key}]`] = value;
        }
    }

    return query;
}
