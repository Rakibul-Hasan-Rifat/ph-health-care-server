type TOptions = {
    page?: number,
    limit?: number,
    sortBy?: string,
    sortOrder?: 'asc' | 'desc',
}

type TFilters = Record<string, unknown>