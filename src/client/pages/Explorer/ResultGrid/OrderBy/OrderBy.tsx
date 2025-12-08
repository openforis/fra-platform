import React, { ReactElement } from 'react'

import { ExplorerOrderByDirection } from 'meta/explorer/selection'
import { DimensionName } from 'meta/measurement/dimension'
import { MeasureName } from 'meta/measurement/measure'

import { useExplorerOrderBy } from 'client/store/explorer/selection/hooks/orderBy'
import Button, { ButtonSize, ButtonType } from 'client/components/Buttons/Button'
import { useOnClick } from 'client/pages/Explorer/ResultGrid/OrderBy/hooks/useOnClick'

type Props = {
  dimensionName: DimensionName
  measureName: MeasureName
}

const OrderBy: React.FC<Props> = (props: Props): ReactElement => {
  const { dimensionName, measureName } = props

  const orderBy = useExplorerOrderBy()

  const active = orderBy?.dimensionName === dimensionName && orderBy?.measureName === measureName
  const activeAsc = active && orderBy?.order === ExplorerOrderByDirection.asc
  const activeDesc = active && orderBy?.order === ExplorerOrderByDirection.desc
  const iconName = activeDesc ? 'sort-amount-desc' : 'sort-amount-asc'

  const onClick = useOnClick({ activeAsc, activeDesc, dimensionName, measureName })

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
