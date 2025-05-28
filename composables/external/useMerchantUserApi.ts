import { ENTRY_URL } from "~/const/api";
import type { ApiResponse } from "~/types/api/ApiResponse";
import type { GetMerchantUserResponse } from "~/types/api/merchantUser/GetMerchantUserResponse";

export default function () {
    function getMerchantUser(merchantId: number) {
        const fetch = useRequestFetch();
        return fetch<ApiResponse<GetMerchantUserResponse>>(`merchant/${merchantId}/user`, {
            method: "GET",
            baseURL: ENTRY_URL,
        });
    }

    return { getMerchantUser };
}
