export interface PaginatedResponse<T> {
  current_page: number
  per_page: number
  total: number
  data: T[]
}

export interface EntityWithId {
  id: number
}
