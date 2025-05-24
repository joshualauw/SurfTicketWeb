import { ENTRY_URL } from "~/const/api";
import type { ApiQuery } from "~/types/api/ApiQuery";
import type { ApiResponse } from "~/types/api/ApiResponse";
import type { CreateVenueRequest } from "~/types/api/venue/CreateVenueRequest";
import type { CreateVenueResponse } from "~/types/api/venue/CreateVenueResponse";
import type { GetAdminVenuesResponse } from "~/types/api/venue/GetAdminVenuesResponse";
import type { TableFilter, TableSort, TablePagination } from "~/types/common/table";

export default function () {
    function getAdminVenues(merchantId: number, pagination: TablePagination, sort: TableSort, filters: TableFilter) {
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

        const fetch = useRequestFetch();
        return fetch<ApiResponse<GetAdminVenuesResponse>>(`venue/admin/${merchantId}`, {
            method: "GET",
            query,
            baseURL: ENTRY_URL,
        });
    }

    function createVenue(merchantId: number, payload: CreateVenueRequest) {
        const fetch = useRequestFetch();
        return fetch<ApiResponse<CreateVenueResponse>>(`venue/admin/${merchantId}`, {
            method: "POST",
            body: payload,
            baseURL: ENTRY_URL,
        });
    }

    return { getAdminVenues, createVenue };
}
