type PaginationOptions = {
    page?: number,
    take?: number,
    sortBy?: string,
    sortOrder?: "asc" | "desc"
}

type PaginationResult = {
    page: number,
    take: number,
    skip: number,
    sortBy: string,
    sortOrder: "asc" | "desc"
}

const calculatePagination = (options: PaginationOptions): PaginationResult => {
    const page = options.page || 1;
    const limit = options.take || 10;
    const skip = (page - 1) * limit || 0;
    const sortBy = options.sortBy || "createdAt";
    const sortOrder = options.sortOrder || "desc";
    return {
        page, take: limit, skip, sortBy, sortOrder
    }
}

export default calculatePagination;