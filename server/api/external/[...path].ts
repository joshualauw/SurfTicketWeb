import { BASE_URL } from "~/const/api";
import { ApiResponse } from "~/types/api/ApiResponse";
import type { FetchError } from "ofetch";

export default defineEventHandler(async (event) => {
    const token = getCookie(event, "auth");
    const path = event.context.params?.path || "";
    const method = event.method;
    const body = method !== "GET" ? await readBody(event) : undefined;
    const query = getQuery(event);

    try {
        const res = await $fetch<ApiResponse<any>>(`${BASE_URL}/${path}`, {
            method,
            query,
            body,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setResponseStatus(event, res.status);

        return res;
    } catch (e: unknown) {
        const err = e as FetchError;
        const errData = err.data as ApiResponse<null>;
        setResponseStatus(event, errData.status);

        return errData;
    }
});
