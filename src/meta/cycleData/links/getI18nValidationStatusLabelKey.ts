import { LinkValidationStatusCode } from 'meta/cycleData/links/link'

const labelKeys: Record<LinkValidationStatusCode, string> = {
  [LinkValidationStatusCode.empty]: 'linkValidation.empty',
  [LinkValidationStatusCode.enotfound]: 'linkValidation.dnsError',
  [LinkValidationStatusCode.invalidEmailAddress]: 'linkValidation.invalidEmailAddress',
  [LinkValidationStatusCode.success]: 'linkValidation.success',
  [LinkValidationStatusCode.urlParsingError]: 'linkValidation.urlParsingError',
}

export const getI18nValidationStatusLabelKey = (code: LinkValidationStatusCode): string => {
  return labelKeys[code]
}
