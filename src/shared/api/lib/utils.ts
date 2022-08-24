
export type  QueryOptions = Record<string, string | number>

export function queryOptionsToString(queryOptions: QueryOptions): string {
  return Object.entries(queryOptions)
    .map((opt) => opt.join('='))
    .join('&');
}