import { apiPath } from 'meta/api/endpoint/_utils'

export const Explorer = {
  sectionsMetadata: (): string => apiPath('explorer', 'sections', 'metadata'),
}
