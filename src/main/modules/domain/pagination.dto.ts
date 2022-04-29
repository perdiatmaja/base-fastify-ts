interface PaginationDTO<T> {
    size: number
    items: T[]
    lastId?: string
}

export default PaginationDTO