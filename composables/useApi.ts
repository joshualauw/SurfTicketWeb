import { type ApiResponseError, type ApiResponse, type ApiResponseValidationError } from "~/types/api/ApiResponse";

export default function <Args extends any[], T>(fn: (...args: Args) => Promise<ApiResponse<T>>) {
    const errors = ref<ApiResponseValidationError[]>([]);
    const error = ref<ApiResponseError | null>(null);
    const loading = ref<boolean>(false);
    const data = ref<T | null>(null);
    const success = ref<boolean>(false);
    const message = ref<string>("");

    const execute = async (...args: Args) => {
        loading.value = true;
        success.value = true;
        error.value = null;
        errors.value = [];
        message.value = "";

        try {
            const result = await fn(...args);
            data.value = result.data;
            message.value = result.message;
        } catch (e: unknown) {
            const err = e as { data: ApiResponse<T> };
            errors.value.push(...(err.data.errors || []));
            error.value = err.data.error || null;
            message.value = err.data.message || "";
            success.value = false;
        } finally {
            loading.value = false;
        }
    };

    return { errors, error, loading, data, success, message, execute };
}
