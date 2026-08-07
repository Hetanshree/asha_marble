export type ApiSuccess<T> = {
  success: true;
  message: string;
  data: T;
  meta?: Record<string, unknown>;
};

export type ApiFailure = {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
};

export type ApiResult<T> = ApiSuccess<T> | ApiFailure;

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};
