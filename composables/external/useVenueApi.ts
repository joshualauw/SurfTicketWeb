import { ENTRY_URL } from "~/const/api";
import type { ApiResponse } from "~/types/api/ApiResponse";
import type { GetAdminVenuesResponse } from "~/types/api/venue/GetAdminVenuesResponse";

export default function () {
    function getAdminVenues(merchantId: number) {
        const fetch = useRequestFetch();
        return fetch<ApiResponse<GetAdminVenuesResponse>>(`venue/admin/${merchantId}`, {
            method: "GET",
            baseURL: ENTRY_URL,
        });
    }

    return { getAdminVenues };
}
