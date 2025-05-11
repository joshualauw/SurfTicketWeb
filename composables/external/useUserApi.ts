import { ENTRY_URL } from "~/const/api";
import type { ApiResponse } from "~/types/api/ApiResponse";
import type { GetProfileResponse } from "~/types/api/user/GetProfileResponse";
import type { MeResponse } from "~/types/api/auth/MeResponse";
import type { UpdateProfileRequest } from "~/types/api/user/UpdateProfileRequest";

export default function () {
    function updateProfile(payload: UpdateProfileRequest) {
        const fetch = useRequestFetch();
        return fetch<ApiResponse<MeResponse>>("user/profile", {
            method: "PUT",
            baseURL: ENTRY_URL,
            body: payload,
        });
    }

    function getProfile() {
        const fetch = useRequestFetch();
        return fetch<ApiResponse<GetProfileResponse>>("user/profile", {
            baseURL: ENTRY_URL,
        });
    }

    return { getProfile, updateProfile };
}
