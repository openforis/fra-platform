import { LinkValidationStatusCode } from 'meta/cycleData/links/link'

const getI18nValidationStatusLabelKey = (code: LinkValidationStatusCode): string => {
  if ([LinkValidationStatusCode.success, LinkValidationStatusCode.empty].includes(code)) {
    return `common.${code}`
  }
  return `admin.${code}`
}

export const Links = {
  getI18nValidationStatusLabelKey,
}
