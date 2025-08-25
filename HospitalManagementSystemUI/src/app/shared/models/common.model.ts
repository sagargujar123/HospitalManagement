export interface Items {
    items: any[];
    pageNumber: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
}

export interface Success {
    statusCode: number;
    message: string;
}

export interface Error {
    statusCode: number;
    message: string;
}

export interface ListItems {
    statusCode: number;
    message: string;
    data: Items
}