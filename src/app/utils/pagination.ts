type PaginationOptions = {
    page?: number,
    limit?: number,
    sortBy?: string,
    sortOrder?: "asc" | "desc"
}

type PaginationResult = {
    page: number,
    limit: number,
    skip: number,
    sortBy: string,
    sortOrder: "asc" | "desc"
}

const calculatePagination = (options: PaginationOptions): PaginationResult => {
    const page = options.page || 1;
    const limit = options.limit || 10;
    const skip = (options.page as number - 1) * (options.limit as number);
    const sortBy = options.sortBy || "createdAt";
    const sortOrder = options.sortOrder || "desc";

    return {
        page, limit, skip, sortBy, sortOrder
    }
}

export default calculatePagination;