import { NDPValidation } from 'meta/assessment/validation/nationalDataPoint'
import { Validation } from 'meta/assessment/validation/validation'

const _isInvalid = (validation?: Validation): boolean => {
  return validation?.valid === false
}

export const hasError = (nationalDataPointValidation?: NDPValidation): boolean => {
  if (!nationalDataPointValidation) return false

  const { comments, dataSources, nationalClasses, year } = nationalDataPointValidation

  if (_isInvalid(year)) return true

  if (Object.values(comments ?? {}).some((comment) => _isInvalid(comment))) return true

  const dataSourceInvalid = Object.values(dataSources ?? {}).some((dataSource) => {
    return Object.values(dataSource).some((field) => _isInvalid(field))
  })
  if (dataSourceInvalid) return true

  const nationalClassInvalid = Object.values(nationalClasses ?? {}).some((nationalClass) => {
    return Object.values(nationalClass).some((field) => _isInvalid(field))
  })
  if (nationalClassInvalid) return true

  return false
}
