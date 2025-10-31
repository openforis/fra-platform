import { apiPath } from 'meta/api/endpoint/_utils'

export const MetaData = {
  metaCache: (): string => apiPath('metadata', 'metaCache'),
  sections: (): string => apiPath('metadata', 'sections'),
  sectionsMetadata: (): string => apiPath('metadata', 'sections', 'metadata'),
}
