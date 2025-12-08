import { useCallback } from 'react'

import { ExplorerOrderBy, ExplorerOrderByDirection } from 'meta/explorer/selection'
import { DimensionName } from 'meta/measurement/dimension'
import { MeasureName } from 'meta/measurement/measure'

import { ExplorerSelectionActions } from 'client/store/explorer/selection/actions'
import { useAppDispatch } from 'client/store/hooks'
import { useSectionRouteParams } from 'client/hooks/routeParams'

type Props = {
  activeAsc: boolean
  activeDesc: boolean
  dimensionName: DimensionName
  measureName: MeasureName
}

type Returned = () => void

export const useOnClick = (props: Props): Returned => {
  const { activeAsc, activeDesc, dimensionName, measureName } = props

  const { assessmentName, cycleName, sectionName } = useSectionRouteParams()
  const dispatch = useAppDispatch()

  return useCallback<Returned>(() => {
    let orderByUpdate: ExplorerOrderBy | undefined = {
      dimensionName,
      measureName,
      order: ExplorerOrderByDirection.asc,
    }

    if (activeAsc) {
      orderByUpdate = { dimensionName, measureName, order: ExplorerOrderByDirection.desc }
    } else if (activeDesc) {
      orderByUpdate = undefined
    }

    dispatch(
      ExplorerSelectionActions.setOrderBy({
        assessmentName,
        cycleName,
        orderBy: orderByUpdate,
        sectionName,
      })
    )
  }, [activeAsc, activeDesc, assessmentName, cycleName, dimensionName, dispatch, measureName, sectionName])
}
