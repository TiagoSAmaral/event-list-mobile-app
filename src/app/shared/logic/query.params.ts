// export interface QueryParams {
//   [key: string]: string | number | boolean | null | undefined;
// }

export type QueryParams = string | number | boolean | null | undefined | { [key: string]: string | number | boolean | null | undefined };

function isObjectQueryParams(q: QueryParams): q is Exclude<QueryParams, string | number | boolean | null | undefined> {
  return typeof q === "object" && q !== null;
}


export function buildURL(base: string, path: string, params?: QueryParams): string {
  
  const url = new URL(path, base);

  if (params) {

    if (isObjectQueryParams(params)) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.set(key, String(value));
        }
      });
    } else {
      url.pathname += '/' + params;
    }
  }

  return url.toString();
}