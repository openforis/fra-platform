import './MeasureTitle.scss'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'
import { Objects } from 'utils/objects'

import { AxisType } from 'meta/explorer/selection'
import { Measure, MeasureName } from 'meta/measurement/measure'
import { Measures } from 'meta/measurement/measures'

import { useExplorerSectionMetadata } from 'client/store/explorer/metadata/hooks/metadata'
import { useExplorerAxisSelection } from 'client/store/explorer/selection/hooks/axisSelection'
import { useExplorerUnits } from 'client/store/explorer/selection/hooks/units'

type Props = {
  measureName: MeasureName
}

const MeasureTitle: React.FC<Props> = (props) => {
  const { measureName } = props

  const { t } = useTranslation()

  const { measures, systemsOfMeasurements } = useExplorerSectionMetadata() ?? {}
  const { x: xAxisSelection } = useExplorerAxisSelection()
  const inXAxis = xAxisSelection.includes(AxisType.measures)

  const selectedUnits = useExplorerUnits()
  const measure = useMemo<Measure | undefined>(
    () => measures?.find((m) => m.name === measureName),
    [measureName, measures]
  )
  const system = systemsOfMeasurements?.[measure.systemName]
  const selectedUnit = selectedUnits?.[measureName] ?? system?.baseUnitName
  const withUnit = !Objects.isEmpty(selectedUnit)
  return (
    <>
      <div className={classNames('measure-title', { 'with-unit': withUnit, 'x-axis': inXAxis })}>
        {t(Measures.getTName(measureName))}
      </div>
      {withUnit && <div className="measure-unit">{`(${t(`unit.${selectedUnit}`)})`}</div>}
    </>
  )
}

export default MeasureTitle
