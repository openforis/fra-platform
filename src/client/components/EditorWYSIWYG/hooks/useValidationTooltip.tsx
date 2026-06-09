import React, { ReactNode, useMemo } from 'react'

import { TooltipId } from 'meta/tooltip/id'
import { Objects } from 'utils/objects'

import { TooltipProps, TooltipType } from 'client/components/Tooltips/type'

type Props = {
  validationErrors: Array<string>
}

type Returned = {
  hasValidationErrors: boolean
  tooltip?: TooltipProps
}

export const useValidationTooltip = (props: Props): Returned => {
  const { validationErrors } = props

  return useMemo<Returned>(() => {
    const hasValidationErrors = !Objects.isEmpty(validationErrors)

    if (!hasValidationErrors) {
      return { hasValidationErrors }
    }

    const content: ReactNode =
      validationErrors.length === 1 ? (
        <div>{validationErrors[0]}</div>
      ) : (
        <ul>
          {validationErrors.map((validationError, index) => (
            <li key={`${validationError}-${index}`}>{validationError}</li>
          ))}
        </ul>
      )

    return { dataTooltipId: TooltipId.error, hasValidationErrors, tooltip: { content, type: TooltipType.error } }
  }, [validationErrors])
}
