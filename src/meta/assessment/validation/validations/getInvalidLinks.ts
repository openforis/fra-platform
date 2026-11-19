import { InvalidLink, Validation, ValidationMessageParam } from 'meta/assessment/validation/validation'
import { getI18nValidationStatusLabelKey } from 'meta/cycleData/links/getI18nValidationStatusLabelKey'
import { invalidLinkMessageKey } from 'meta/cycleData/links/invalidLinkMessageKey'
import { LinkValidationStatusCode } from 'meta/cycleData/links/link'
import { Objects } from 'utils/objects'

const emptyLinkReasonKey = getI18nValidationStatusLabelKey(LinkValidationStatusCode.empty)

const _isEmptyLink = (reason: ValidationMessageParam | undefined): boolean => {
  const isKeyParam = !Objects.isNil(reason) && typeof reason === 'object' && 'key' in reason
  return isKeyParam && reason.key === emptyLinkReasonKey
}

export const getInvalidLinks = (validation: Validation | undefined): Array<InvalidLink> => {
  const messages = validation?.messages ?? []

  return messages.reduce<Array<InvalidLink>>((acc, message) => {
    if (message.key !== invalidLinkMessageKey) return acc

    const { link, reason } = message.params ?? {}

    if (_isEmptyLink(reason)) {
      acc.push({ link: '', message })
      return acc
    }

    if (typeof link === 'string') acc.push({ link, message })

    return acc
  }, [])
}
