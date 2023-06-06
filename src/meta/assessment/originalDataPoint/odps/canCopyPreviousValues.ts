import { Objects } from 'utils/objects'

import { OriginalDataPoint } from '../originalDataPoint'

export const canCopyPreviousValues = (odp: OriginalDataPoint): boolean => {
  const className = odp?.nationalClasses?.[0]?.name ?? ''
  return Objects.isEmpty(className)
}
