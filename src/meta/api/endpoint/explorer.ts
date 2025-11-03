import { apiPath } from 'meta/api/endpoint/_utils'

export const Explorer = {
  data: (): string => apiPath('explorer', 'data'),
  sectionsMetadata: (): string => apiPath('explorer', 'sections', 'metadata'),
}
