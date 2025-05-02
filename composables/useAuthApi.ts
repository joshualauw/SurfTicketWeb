import { BASE_URL } from "~/config/api";
import type { ApiResponse } from "~/types/api/ApiResponse";
import type { LoginData } from "~/types/api/auth/LoginData";
import type { LoginDto } from "~/types/api/auth/LoginDto";

export default function () {
    async function login(payload: LoginDto) {
        return await $fetch<ApiResponse<LoginData>>("/auth/login", {
            method: "POST",
            body: payload,
            baseURL: BASE_URL,
        });
    }

    return { login };
}
