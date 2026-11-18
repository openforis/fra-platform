import React, { ReactNode, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { InvalidLink } from 'meta/assessment/validation/validation'
import { MessageParser } from 'meta/validations/messageParser'
import { Objects } from 'utils/objects'

import { TooltipProps, TooltipType } from 'client/components/Tooltips/type'

type Props = {
  invalidLinks?: Array<InvalidLink>
  validationErrors: Array<string>
}

type Returned = {
  hasValidationErrors: boolean
  invalidLinksOnly: boolean
  tooltip?: TooltipProps
}

export const useValidationTooltip = (props: Props): Returned => {
  const { invalidLinks = [], validationErrors } = props

  const { t } = useTranslation()

  return useMemo<Returned>(() => {
    const hasValidationErrors = !Objects.isEmpty(validationErrors)

    // Each invalid link shows its own error, so the editor's tooltip leaves them out
    const linkErrors = invalidLinks.map<string>(({ message }) => MessageParser.getMessage(t, message))
    const errors = validationErrors.filter((validationError) => !linkErrors.includes(validationError))
    const invalidLinksOnly = hasValidationErrors && Objects.isEmpty(errors)

    if (Objects.isEmpty(errors)) {
      return { hasValidationErrors, invalidLinksOnly }
    }

    const content: ReactNode =
      errors.length === 1 ? (
        <div>{errors[0]}</div>
      ) : (
        <ul>
          {errors.map((error, index) => (
            <li key={`${error}-${index}`}>{error}</li>
          ))}
        </ul>
      )

    return { hasValidationErrors, invalidLinksOnly, tooltip: { content, type: TooltipType.error } }
  }, [invalidLinks, t, validationErrors])
}
