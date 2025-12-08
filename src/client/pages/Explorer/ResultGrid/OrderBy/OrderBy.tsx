import React, { ReactElement, useCallback } from 'react'

import { ExplorerOrderBy, ExplorerOrderByDirection } from 'meta/explorer/selection'
import { DimensionName } from 'meta/measurement/dimension'
import { MeasureName } from 'meta/measurement/measure'

import { ExplorerSelectionActions } from 'client/store/explorer/selection/actions'
import { useExplorerOrderBy } from 'client/store/explorer/selection/hooks/orderBy'
import { useAppDispatch } from 'client/store/hooks'
import { useSectionRouteParams } from 'client/hooks/routeParams'
import Button, { ButtonSize, ButtonType } from 'client/components/Buttons/Button'

type Props = {
  dimensionName: DimensionName
  measureName: MeasureName
}

const OrderBy: React.FC<Props> = (props: Props): ReactElement => {
  const { dimensionName, measureName } = props

  const dispatch = useAppDispatch()
  const orderBy = useExplorerOrderBy()
  const { assessmentName, cycleName, sectionName } = useSectionRouteParams()

  const active = orderBy?.dimensionName === dimensionName && orderBy?.measureName === measureName
  const activeAsc = active && orderBy?.order === ExplorerOrderByDirection.asc
  const activeDesc = active && orderBy?.order === ExplorerOrderByDirection.desc
  const iconName = activeDesc ? 'sort-amount-desc' : 'sort-amount-asc'

  const onClick = useCallback<() => void>(() => {
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

  return (
    <Button
      bgTransparent
      iconName={iconName}
      inverse
      noBorder
      onClick={onClick}
      size={ButtonSize.m}
      type={active ? ButtonType.primary : ButtonType.anonymous}
    />
  )
}

export default OrderBy
