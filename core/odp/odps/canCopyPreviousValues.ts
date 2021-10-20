import { Objects } from '@core/utils'
import { ODP } from '../odp'

export const canCopyPreviousValues = (odp: ODP): boolean => {
  const className = odp?.nationalClasses?.[0]?.name ?? ''
  return Objects.isEmpty(className)
}
