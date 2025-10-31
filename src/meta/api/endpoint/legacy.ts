import { apiPath } from 'meta/api/endpoint/_utils'

export const _Legacy = {
  File: {
    // Note: Some users might use this still
    // Legacy API Endpoint to return hidden files, replaced with redirect to RepositoryAPI get file
    hidden: (): string => apiPath('file', 'hidden'),
  },
}
