import { useCallback } from 'react'

import { DataSourceValidationErrors } from 'meta/assessment/descriptionValue/dataSource'
import { TooltipId } from 'meta/tooltip/id'

type Props = {
  validationErrors: DataSourceValidationErrors
}

type ErrorTooltipProps = {
  dataTooltipContent?: string
  dataTooltipId?: TooltipId.error
}

type Returned = (componentKey: keyof DataSourceValidationErrors) => ErrorTooltipProps

export const useGetErrorTooltipProps = (props: Props): Returned => {
  const { validationErrors } = props

  return useCallback<Returned>(
    (componentKey) => {
      // Reference error tooltips are handled in the editor WYSIWYG.
      if (componentKey === 'reference') return {}

      const dataTooltipContent = validationErrors[componentKey]

      return {
        dataTooltipContent,
        dataTooltipId: dataTooltipContent ? TooltipId.error : undefined,
      }
    },
    [validationErrors]
  )
}
