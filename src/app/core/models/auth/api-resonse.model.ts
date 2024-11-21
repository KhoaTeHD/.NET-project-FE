export interface ApiResponse<T> {
    isSuccess: boolean;
    message: string | null;
    result?: T;
}