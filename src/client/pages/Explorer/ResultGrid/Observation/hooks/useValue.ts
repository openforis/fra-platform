import { useMemo } from 'react'

import { Objects } from 'utils/objects'

import { RecordAssessmentDatas } from 'meta/data'
import { Dimensions } from 'meta/measurement/dimensions'
import { Measure } from 'meta/measurement/measure'
import { Measures } from 'meta/measurement/measures'
import { Units } from 'meta/measurement/units'

import { useExplorerSectionMetadata } from 'client/store/explorer/metadata/hooks/metadata'
import { useExplorerUnits } from 'client/store/explorer/selection/hooks/units'
import { useSectionRouteParams } from 'client/hooks/useRouteParams'
import { ObservationProps } from 'client/pages/Explorer/ResultGrid/Observation/types'

type Returned = string

export const useValue = (props: ObservationProps): Returned => {
  const { countryIso, data, dimensionName, measureName, tableName } = props

  const { assessmentName, cycleName } = useSectionRouteParams()

  const { measures, systemsOfMeasurements } = useExplorerSectionMetadata() ?? {}

  const selectedUnits = useExplorerUnits()

  const measure = useMemo<Measure | undefined>(
    () => measures?.find((m) => m.name === measureName),
    [measureName, measures]
  )

  return useMemo<Returned>(() => {
    const value = RecordAssessmentDatas.getDatum({
      assessmentName,
      colName: Dimensions.dimensionNameToColumnName(dimensionName),
      countryIso,
      cycleName,
      data,
      tableName,
      variableName: Measures.measureNameToVariableName(measureName),
    })

    if (Objects.isEmpty(measure)) return value

    const system = systemsOfMeasurements?.[measure.systemName]
    if (Objects.isEmpty(system)) return value
    if (Object.keys(system.units).length === 1) return value

    const unitName = selectedUnits?.[measureName] ?? system.baseUnitName

    return Units.convertValue(value, unitName, system)
  }, [
    assessmentName,
    countryIso,
    cycleName,
    data,
    dimensionName,
    measure,
    measureName,
    selectedUnits,
    systemsOfMeasurements,
    tableName,
  ])
}
