import { LinkValidationStatusCode } from 'meta/cycleData/links/link'

export const getI18nValidationStatusLabelKey = (code: LinkValidationStatusCode): string => {
  if (
    [
      LinkValidationStatusCode.success,
      LinkValidationStatusCode.empty,
      LinkValidationStatusCode.invalidEmailAddress,
    ].includes(code)
  ) {
    return `common.${code}`
  }
  return `admin.${code}`
}
