import { apiPath } from 'meta/api/endpoint/_utils'

export const Static = {
  file: (s3path = '*s3path'): string => apiPath('static', 'file', s3path),
  files: (): string => apiPath('static', 'files'),
}
