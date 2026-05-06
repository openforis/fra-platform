import { Validation } from 'meta/assessment/validation/validation'
import { Objects } from 'utils/objects'

import { getLinksFromHtml } from 'server/controller/cycleData/links/utils/getLinksFromHtml'

const invalidLinkValidation: Validation = { valid: false, messages: [{ key: 'generalValidation.invalidLink' }] }

export const links = (html: string): Validation | undefined => {
  if (Objects.isEmpty(html)) {
    return undefined
  }

  const hasInvalidLinks = getLinksFromHtml(html).some(({ link }) => Objects.isEmpty(link?.trim()))

  if (!hasInvalidLinks) {
    return undefined
  }

  return invalidLinkValidation
}
