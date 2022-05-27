/**
 * Used for queries that require pagination
 */
export interface PaginatedPayload {
  page: number;
  pageSize: number;
}

/**
 * Used for queries that require pagination
 */
export interface PaginatedResponse<T> extends PaginatedPayload {
  data: T[];
}

/**
 * All endpoints should return this type
 */
export interface BaseResponse<T> {
  res?: T;
  error?: string;
}
