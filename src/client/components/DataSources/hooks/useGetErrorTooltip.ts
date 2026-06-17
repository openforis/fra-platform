import { useCallback } from 'react'

import { DataSourceValidationErrors } from 'meta/assessment/descriptionValue/dataSource'
import { Objects } from 'utils/objects'

import { TooltipProps, TooltipType } from 'client/components/Tooltips/type'

type Props = {
  validationErrors: DataSourceValidationErrors
}

type Returned = (componentKey: keyof DataSourceValidationErrors) => TooltipProps | undefined

export const useGetErrorTooltip = (props: Props): Returned => {
  const { validationErrors } = props

  return useCallback<Returned>(
    (componentKey) => {
      // Reference error tooltips are handled in the editor WYSIWYG.
      if (componentKey === 'reference') return undefined

      const content = validationErrors[componentKey]

      return Objects.isEmpty(content) ? undefined : { content, type: TooltipType.error }
    },
    [validationErrors]
  )
}
