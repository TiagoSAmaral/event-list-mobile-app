export interface QueryParams {
  [key: string]: string | number | boolean | null | undefined;
}

export function buildURL(base: string, path: string, params?: QueryParams): string {
  const url = new URL(path, base);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, String(value));
      }
    });
  }

  return url.toString();
}