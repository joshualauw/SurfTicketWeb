import { ENTRY_URL } from "~/const/api";
import type { ApiResponse } from "~/types/api/ApiResponse";
import type { CreateVenueRequest } from "~/types/api/venue/CreateVenueRequest";
import type { CreateVenueResponse } from "~/types/api/venue/CreateVenueResponse";
import type { GetAdminVenuesResponse } from "~/types/api/venue/GetAdminVenuesResponse";

export default function () {
    function getAdminVenues(merchantId: number, page: number) {
        const fetch = useRequestFetch();
        return fetch<ApiResponse<GetAdminVenuesResponse>>(`venue/admin/${merchantId}`, {
            method: "GET",
            query: { page, size: 2 },
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
