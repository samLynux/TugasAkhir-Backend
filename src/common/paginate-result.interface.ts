export class PaginatedResult{
    data: any[];
    meta: {
        total: number;
        page: number;
        lastpage: number;
    }
}