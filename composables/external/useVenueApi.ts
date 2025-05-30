import { ENTRY_URL } from "~/const/api";
import type { ApiResponse } from "~/types/api/ApiResponse";
import type { CreateVenueRequest } from "~/types/api/venue/CreateVenueRequest";
import type { CreateVenueResponse } from "~/types/api/venue/CreateVenueResponse";
import type { GetAdminVenueResponse } from "~/types/api/venue/GetAdminVenueResponse";
import type { GetAdminVenuesResponse } from "~/types/api/venue/GetAdminVenuesResponse";
import type { UpdateVenueLogoRequest } from "~/types/api/venue/UpdateVenueLogoRequest";
import type { UpdateVenueLogoResponse } from "~/types/api/venue/UpdateVenueLogoResponse";
import type { UpdateVenueRequest } from "~/types/api/venue/UpdateVenueRequest";
import type { TableFilter, TableSort, TablePagination } from "~/types/common/table";

export default function () {
    function getAdminVenues(merchantId: number, pagination: TablePagination, sort: TableSort, filters: TableFilter) {
        const query = useApiQuery(pagination, sort, filters);
        const fetch = useRequestFetch();
        return fetch<ApiResponse<GetAdminVenuesResponse>>(`venue/admin/${merchantId}`, {
            method: "GET",
            query,
            baseURL: ENTRY_URL,
        });
    }

    function getAdminVenue(merchantId: number, venueId: number) {
        const fetch = useRequestFetch();
        return fetch<ApiResponse<GetAdminVenueResponse>>(`venue/admin/${merchantId}/${venueId}`, {
            method: "GET",
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

    function updateVenue(merchantId: number, venueId: number, payload: UpdateVenueRequest) {
        const fetch = useRequestFetch();
        return fetch<ApiResponse<null>>(`venue/admin/${merchantId}/${venueId}`, {
            method: "PUT",
            body: payload,
            baseURL: ENTRY_URL,
        });
    }

    function updateVenueLogo(merchantId: number, venueId: number, payload: UpdateVenueLogoRequest) {
        const formData = new FormData();
        formData.append("logo", payload.logo);

        const fetch = useRequestFetch();
        return fetch<ApiResponse<UpdateVenueLogoResponse>>(`venue/admin/${merchantId}/${venueId}/upload`, {
            method: "POST",
            body: formData,
            baseURL: ENTRY_URL,
        });
    }

    function deleteVenue(merchantId: number, venueId: number) {
        const fetch = useRequestFetch();
        return fetch<ApiResponse<any>>(`venue/admin/${merchantId}/${venueId}`, {
            method: "DELETE",
            baseURL: ENTRY_URL,
        });
    }

    return { getAdminVenues, getAdminVenue, createVenue, updateVenue, updateVenueLogo, deleteVenue };
}
