import { useCallback } from 'react'

import { MeasureName } from 'meta/measurement/measure'
import { Objects } from 'utils/objects'

import { useExplorerSectionMetadata } from 'client/store/explorer/metadata/hooks/metadata'
import { ExplorerSelectionActions } from 'client/store/explorer/selection/actions'
import { useAppDispatch } from 'client/store/hooks'
import { useSectionRouteParams } from 'client/hooks/routeParams'

type Returned = (value: Array<string>) => void

export const useOnChange = (): Returned => {
  const dispatch = useAppDispatch()
  const { measures } = useExplorerSectionMetadata() ?? {}

  const { assessmentName, cycleName, sectionName } = useSectionRouteParams()

  return useCallback<Returned>(
    (selectedValues) => {
      if (Objects.isEmpty(measures)) return

      // keep the selection in table order
      const selectedSet = new Set(selectedValues)
      const sortedSelection = measures.filter(({ name }) => selectedSet.has(name)).map<MeasureName>(({ name }) => name)

      dispatch(
        ExplorerSelectionActions.setMeasures({
          assessmentName,
          cycleName,
          measures: sortedSelection,
          sectionName,
        })
      )
    },
    [assessmentName, cycleName, dispatch, measures, sectionName]
  )
}
