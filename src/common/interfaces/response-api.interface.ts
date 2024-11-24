
export interface AllApiResponse<T>{
    meta: Metadata
    data: T[]
}

export interface Metadata {
    page: number;
    lastPage: number;
    limit: number;
    total: number;
}