import { apiPath } from 'meta/api/endpoint/_utils'

export const Geo = {
  bounds: (): string => apiPath('geo', 'bounds'),
  sepalProxy: (): string => apiPath('geo', 'sepal'),
  Layers: {
    forest: (): string => apiPath('geo', 'layers', 'forest'),
    forestAgreement: (): string => apiPath('geo', 'layers', 'forest-agreement'),
    protectedArea: (): string => apiPath('geo', 'layers', 'protected-area'),
    burnedArea: (): string => apiPath('geo', 'layers', 'burned-area'),
    boundaries: (): string => apiPath('geo', 'layers', 'boundaries'),
    unBoundaries: (): string => apiPath('geo', 'layers', 'un-boundaries'),
  },
  Estimations: {
    forest: (): string => apiPath('geo', 'estimations', 'forest'),
    forestAgreement: (): string => apiPath('geo', 'estimations', 'forest-agreement'),
    intersectionArea: (): string => apiPath('geo', 'estimations', 'intersection-area'),
  },
}
