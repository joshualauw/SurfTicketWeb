import type { ApiResponse } from "~/types/api/ApiResponse";
import type { LoginResponse } from "~/types/api/auth/LoginResponse";
import type { LoginRequest } from "~/types/api/auth/LoginRequest";
import type { MeResponse } from "~/types/api/auth/MeResponse";
import { ENTRY_URL } from "~/const/api";

export default function () {
    function login(payload: LoginRequest) {
        return $fetch<ApiResponse<LoginResponse>>("/api/auth/login", {
            method: "POST",
            body: payload,
        });
    }

    function me() {
        const fetch = useRequestFetch();
        return fetch<ApiResponse<MeResponse>>("auth/me", {
            baseURL: ENTRY_URL,
        });
    }

    return { login, me };
}
