export interface IAPIResponse<T> {
    data: T;
    message?: string;
    status: number;
    timestamp?: string;
    pagination?: IPagination;
    error?: any;
}

export interface IPagination {
    page: number;
    size: number;
    total: number;
    totalPages: number;
}