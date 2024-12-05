import { HttpStatus } from "@nestjs/common";

export interface Metadata {
    page: number;
    lastPage: number;
    limit: number;
    total: number;
}

export interface Status {
    statusMsg: keyof typeof HttpStatus;
    statusCode: number;
    error: string | null;
}

export interface ResponseApi<T> {
    status: Status;
    data: T;
}

export interface AllApiResponse<T>{
    meta: Metadata;
    data: T[];
}



