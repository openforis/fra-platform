import { useCallback } from 'react'

import { Objects } from 'utils/objects'

import { ExplorerSelectionActions } from 'client/store/explorer/selection/actions'
import { useAppDispatch } from 'client/store/hooks'
import { useSectionRouteParams } from 'client/hooks/routeParams'
import { Option } from 'client/components/Inputs/Select'

type Props = {
  options: Array<Option> | undefined
}

type Returned = (value: Array<string>) => void

export const useOnChange = (props: Props): Returned => {
  const { options } = props
  const dispatch = useAppDispatch()

  const { assessmentName, cycleName, sectionName } = useSectionRouteParams()

  return useCallback<Returned>(
    (selectedValues) => {
      if (Objects.isEmpty(options)) return

      const selectedSet = new Set(selectedValues)
      const sortedSelection = options.reduce<Array<string>>((acc, { value }) => {
        if (selectedSet.has(value)) {
          acc.push(value)
        }
        return acc
      }, [])

      dispatch(
        ExplorerSelectionActions.setMeasures({
          assessmentName,
          cycleName,
          measures: sortedSelection,
          sectionName,
        })
      )
    },
    [assessmentName, cycleName, dispatch, options, sectionName]
  )
}
