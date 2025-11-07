import { apiPath } from 'meta/api/endpoint/_utils'

export const Print = {
  Report: {
    one: (): string => apiPath('cycle-data', 'print', 'report'),
  },
}
