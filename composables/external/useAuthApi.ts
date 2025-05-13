import { ENTRY_URL } from "~/const/api";
import type { ApiResponse } from "~/types/api/ApiResponse";
import type { LoginRequest } from "~/types/api/auth/LoginRequest";
import type { LoginResponse } from "~/types/api/auth/LoginResponse";
import type { MeResponse } from "~/types/api/auth/MeResponse";
import type { ChangePasswordResponse } from "~/types/api/auth/ChangePasswordResponse";
import type { ChangePasswordRequest } from "~/types/api/auth/ChangePasswordRequest";
import type { RegisterRequest } from "~/types/api/auth/RegisterRequest";
import type { RegisterResponse } from "~/types/api/auth/RegisterResponse";
import type { VerifyEmailResponse } from "~/types/api/auth/VerifyEmailResponse";
import type { VerifyEmailRequest } from "~/types/api/auth/VerifyEmailRequest";

export default function () {
    function login(payload: LoginRequest) {
        return $fetch<ApiResponse<LoginResponse>>("/api/auth/login", {
            method: "POST",
            body: payload,
        });
    }

    function logout() {
        return $fetch("/api/auth/logout", {
            method: "POST",
        });
    }

    function verifyEmail(payload: VerifyEmailRequest) {
        return $fetch<ApiResponse<VerifyEmailResponse>>("/api/auth/verify", {
            method: "POST",
            body: payload,
        });
    }

    function register(payload: RegisterRequest) {
        const fetch = useRequestFetch();
        return fetch<ApiResponse<RegisterResponse>>("auth/register", {
            method: "POST",
            baseURL: ENTRY_URL,
            body: payload,
        });
    }

    function me() {
        const fetch = useRequestFetch();
        return fetch<ApiResponse<MeResponse>>("auth/me", {
            baseURL: ENTRY_URL,
        });
    }

    function changePassword(payload: ChangePasswordRequest) {
        const fetch = useRequestFetch();
        return fetch<ApiResponse<ChangePasswordResponse>>("auth/password", {
            method: "PUT",
            baseURL: ENTRY_URL,
            body: payload,
        });
    }

    return { login, me, changePassword, register, verifyEmail, logout };
}
