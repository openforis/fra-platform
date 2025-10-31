import { apiPath } from 'meta/api/endpoint/_utils'

export const ExtData = {
  Taxa: {
    search: (): string => apiPath('ext-data', 'taxa', 'search'),
  },
}
