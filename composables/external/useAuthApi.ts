import type { ApiResponse } from "~/types/api/ApiResponse";
import type { LoginData } from "~/types/api/auth/LoginData";
import type { LoginDto } from "~/types/api/auth/LoginDto";

export default function () {
    function login(payload: LoginDto) {
        return $fetch<ApiResponse<LoginData>>("/api/auth/login", {
            method: "POST",
            body: payload,
        });
    }

    function me() {
        const requestFetch = useRequestFetch();
        return requestFetch<LoginData>("/api/auth/me");
    }

    return { login, me };
}
