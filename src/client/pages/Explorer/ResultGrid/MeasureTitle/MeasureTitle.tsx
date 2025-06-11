import './MeasureTitle.scss'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import { Measure, MeasureName } from 'meta/measurement/measure'
import { Measures } from 'meta/measurement/measures'

import { useExplorerSectionMetadata } from 'client/store/explorer/metadata/hooks/metadata'
import { useExplorerUnits } from 'client/store/explorer/selection/hooks/units'
import SelectPrimary from 'client/components/Inputs/SelectPrimary'

import { useOnUnitChange } from './hooks/useOnUnitChange'
import { useUnitOptions } from './hooks/useUnitOptions'

type Props = {
  measureName: MeasureName
}

const MeasureTitle: React.FC<Props> = (props) => {
  const { measureName } = props

  const { t } = useTranslation()

  const { measures, systemsOfMeasurements } = useExplorerSectionMetadata() ?? {}
  const selectedUnits = useExplorerUnits()
  const measure = useMemo<Measure | undefined>(
    () => measures?.find((m) => m.name === measureName),
    [measureName, measures]
  )
  const system = systemsOfMeasurements?.[measure.systemName]
  const selectedUnit = selectedUnits?.[measureName] ?? system?.baseUnitName

  const onUnitChange = useOnUnitChange({ measureName })
  const unitOptions = useUnitOptions({ measureName })

  return (
    <div className="measure-title">
      <span>{t(Measures.getTName(measureName))}</span>
      {system && unitOptions.length > 1 && (
        <SelectPrimary isClearable={false} onChange={onUnitChange} options={unitOptions} value={selectedUnit} />
      )}
      {!Objects.isEmpty(system?.baseUnitName) && unitOptions.length <= 1 && (
        <span>{` (${t(`unit.${system.baseUnitName}`)})`}</span>
      )}
    </div>
  )
}

export default MeasureTitle
