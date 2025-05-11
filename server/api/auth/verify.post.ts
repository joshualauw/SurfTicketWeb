import { BASE_URL } from "~/const/api";
import { ApiResponse } from "~/types/api/ApiResponse";
import { VerifyEmailRequest } from "~/types/api/auth/VerifyEmailRequest";
import { VerifyEmailResponse } from "~/types/api/auth/VerifyEmailResponse";
import type { FetchError } from "ofetch";

export default defineEventHandler(async (event) => {
    const body = await readBody<VerifyEmailRequest>(event);

    try {
        const res = await $fetch<ApiResponse<VerifyEmailResponse>>("/auth/verify", {
            method: "POST",
            body,
            baseURL: BASE_URL,
        });

        if (res.success && res.data) {
            setResponseStatus(event, res.status);

            setCookie(event, "auth", res.data.token, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                path: "/",
                maxAge: 60 * 60 * 24,
            });
        }

        return res;
    } catch (e: unknown) {
        const err = e as FetchError;
        const errData = err.data as ApiResponse<null>;
        setResponseStatus(event, errData.status);

        return errData;
    }
});
