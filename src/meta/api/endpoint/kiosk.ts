import { apiPath } from 'meta/api/endpoint/_utils'

export const Kiosk = {
  latestActivities: (): string => apiPath('kiosk', 'latest-activities'),
}
