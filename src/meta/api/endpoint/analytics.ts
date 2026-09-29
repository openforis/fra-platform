import { apiPath } from 'meta/api/endpoint/_utils'

export const Analytics = {
  event: (): string => apiPath('analytics', 'event'),
  trackingEvents: (): string => apiPath('analytics', 'tracking-events'),
}
