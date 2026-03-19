export type NextFetchRequestConfig = {
  revalidate?: number | false;
  tags?: string[];
};

export interface FetchApiOptions {
  method: "GET" | "POST" | "PUT" | "DELETE";
  authToken?: string;
  body?: Record<string, unknown>;
  next?: NextFetchRequestConfig;
}
