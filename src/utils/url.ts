export const constructUrl = (baseUrl: string, path: string) =>
  !baseUrl || !path ? null : `${baseUrl}${path}`
