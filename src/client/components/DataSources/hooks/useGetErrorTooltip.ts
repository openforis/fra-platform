import { useCallback } from 'react'

import { DataSource, DataSourceValidationErrors } from 'meta/assessment/descriptionValue/dataSource'
import { Objects } from 'utils/objects'

import { TooltipProps, TooltipType } from 'client/components/Tooltips/type'

type Props = {
  validationErrors: DataSourceValidationErrors
}

type Returned = (componentKey: keyof DataSource) => TooltipProps | undefined

export const useGetErrorTooltip = (props: Props): Returned => {
  const { validationErrors } = props

  return useCallback<Returned>(
    (componentKey) => {
      // Reference error tooltips are handled in the editor WYSIWYG.
      if (componentKey === 'reference') return undefined

      const content = validationErrors[componentKey as keyof DataSourceValidationErrors]

      return Objects.isEmpty(content) ? undefined : { content, type: TooltipType.error }
    },
    [validationErrors]
  )
}
