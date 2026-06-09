import React, { HTMLAttributes, useMemo } from 'react'
import ReactDOMServer from 'react-dom/server'

import { TooltipId } from 'meta/tooltip/id'
import { Objects } from 'utils/objects'

type Props = {
  validationErrors: Array<string>
}

type Returned = {
  dataTooltipHtml?: HTMLAttributes<HTMLDivElement>['data-tooltip-html']
  dataTooltipId?: HTMLAttributes<HTMLDivElement>['data-tooltip-id']
  hasValidationErrors: boolean
}

export const useValidationTooltip = (props: Props): Returned => {
  const { validationErrors } = props

  return useMemo<Returned>(() => {
    const hasValidationErrors = !Objects.isEmpty(validationErrors)

    if (!hasValidationErrors) {
      return {
        dataTooltipHtml: undefined,
        dataTooltipId: undefined,
        hasValidationErrors,
      }
    }

    if (validationErrors.length === 1) {
      const dataTooltipHtml = ReactDOMServer.renderToStaticMarkup(<div>{validationErrors[0]}</div>)

      return { dataTooltipHtml, dataTooltipId: TooltipId.error, hasValidationErrors }
    }

    const dataTooltipHtml = ReactDOMServer.renderToStaticMarkup(
      <ul>
        {validationErrors.map((validationError, index) => (
          <li key={`${validationError}-${index}`}>{validationError}</li>
        ))}
      </ul>
    )

    return { dataTooltipHtml, dataTooltipId: TooltipId.error, hasValidationErrors }
  }, [validationErrors])
}
