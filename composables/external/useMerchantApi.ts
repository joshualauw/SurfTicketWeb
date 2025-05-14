import { ENTRY_URL } from "~/const/api";
import type { ApiResponse } from "~/types/api/ApiResponse";
import type { CreateMerchantRequest } from "~/types/api/merchant/CreateMerchantRequest";
import type { CreateMerchantResponse } from "~/types/api/merchant/CreateMerchantResponse";
import type { GetHandledMerchantResponse } from "~/types/api/merchant/GetHandledMerchantResponse";

export default function () {
    function createMerchant(payload: CreateMerchantRequest) {
        const fetch = useRequestFetch();
        return fetch<ApiResponse<CreateMerchantResponse>>("merchant", {
            method: "POST",
            baseURL: ENTRY_URL,
            body: payload,
        });
    }

    function getHandledMerchants() {
        const fetch = useRequestFetch();
        return fetch<ApiResponse<GetHandledMerchantResponse>>("merchant", {
            method: "GET",
            baseURL: ENTRY_URL,
        });
    }

    return { createMerchant, getHandledMerchants };
}
