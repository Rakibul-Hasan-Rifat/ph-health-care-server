import { UserRole } from "../../prisma/generated/prisma/enums"

type TOptions = {
    page?: number,
    limit?: number,
    sortBy?: string,
    sortOrder?: 'asc' | 'desc',
}

type TFilters = Record<string, unknown>

type TJWTUser = {
    email: string,
    role: UserRole
}