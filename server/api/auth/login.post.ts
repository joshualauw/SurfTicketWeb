import { BASE_URL } from "~/config/api";
import { ApiResponse } from "~/types/api/ApiResponse";
import { LoginData } from "~/types/api/auth/LoginData";
import { LoginDto } from "~/types/api/auth/LoginDto";
import type { FetchError } from "ofetch";

export default defineEventHandler(async (event) => {
    const body = await readBody<LoginDto>(event);

    try {
        const res = await $fetch<ApiResponse<LoginData>>("/auth/login", {
            method: "POST",
            body,
            baseURL: BASE_URL,
        });

        if (res.success && res.data) {
            setResponseStatus(event, res.status);

            setCookie(event, "auth", JSON.stringify(res.data), {
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
