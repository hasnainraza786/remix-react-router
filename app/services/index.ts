import qs from "query-string";

const API_URL = "https://dummyjson.com";
const defaultHeaders: Record<string, string> = {
  "Content-Type": "application/json",
};

export function setAuthenticationHeader(token: string): void {
  defaultHeaders.Authorization = `Bearer ${token}`;
}

export function getAuthenticationToken(): string | undefined {
  return defaultHeaders.Authorization;
}

export function removeAuthenticationHeader(): void {
  delete defaultHeaders.Authorization;
}

interface RequestArgs {
  url: string;
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  data?: any;
  headers?: Record<string, string>;
  queryParams?: Record<string, any>;
  noAuth?: boolean;
}

async function service<T = any>(args: RequestArgs): Promise<T> {
  const { url, method = "GET", data, headers = {}, queryParams, noAuth } = args;

  const finalHeaders = { ...defaultHeaders, ...headers };
  if (noAuth) delete finalHeaders.Authorization;

  let fullUrl = `${API_URL}${url}`;
  if (queryParams) {
    fullUrl += `?${qs.stringify(queryParams)}`;
  }

  const options: RequestInit = {
    method,
    headers: finalHeaders,
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const res = await fetch(fullUrl, options);
  if (!res.ok) throw await res.json();

  return res.json();
}

export default service;
