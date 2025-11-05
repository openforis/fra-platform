export const joinPaths = (...parts: Array<string>): string => `/${parts.join('/')}`

export const apiPath = (...parts: Array<string>): string => joinPaths('api', ...parts)
