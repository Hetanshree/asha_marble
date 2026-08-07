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

export class ApiRequestError extends Error {
  errors?: Record<string, string[]>;
  status: number;

  constructor(message: string, status: number, errors?: Record<string, string[]>) {
    super(message);
    this.name = "ApiRequestError";
    this.status = status;
    this.errors = errors;
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<ApiSuccess<T>> {
  const response = await fetch(path, {
    ...init,
    credentials: "include",
    headers: {
      ...(init?.body && !(init.body instanceof FormData) ? { "Content-Type": "application/json" } : {}),
      ...init?.headers,
    },
  });

  const body = (await response.json()) as ApiSuccess<T> | ApiFailure;

  if (!body.success) {
    throw new ApiRequestError(body.message, response.status, body.errors);
  }

  return body;
}

export const api = {
  get: <T>(path: string) => request<T>(path, { method: "GET", cache: "no-store" }),
  post: <T>(path: string, data?: unknown) =>
    request<T>(path, { method: "POST", body: data instanceof FormData ? data : JSON.stringify(data ?? {}) }),
  put: <T>(path: string, data?: unknown) => request<T>(path, { method: "PUT", body: JSON.stringify(data ?? {}) }),
  delete: <T>(path: string, data?: unknown) =>
    request<T>(path, { method: "DELETE", body: data ? JSON.stringify(data) : undefined }),
};
