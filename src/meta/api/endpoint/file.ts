import { apiPath } from 'meta/api/endpoint/_utils'

export const File = {
  many: (): string => apiPath('files'),
  bulkDownload: (): string => apiPath('file', 'bulk-download'),
}
