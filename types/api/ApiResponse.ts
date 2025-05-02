export interface ApiResponse<T> {
    status: number;
    message: string;
    success: boolean;
    errors: ApiResponseValidationError[];
    error: ApiResponseError | null;
    data: T | null;
}

export interface ApiResponseValidationError {
    path: string;
    message: string;
}

export interface ApiResponseError {
    errorCode: number;
    errorMessage: string;
}
