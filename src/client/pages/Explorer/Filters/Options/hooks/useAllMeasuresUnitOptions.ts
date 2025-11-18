import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import { MeasureName } from 'meta/measurement/measure'
import { UnitName } from 'meta/measurement/unitName'

import { useExplorerSectionMetadata } from 'client/store/explorer/metadata/hooks/metadata'
import { Option } from 'client/components/Inputs/Select'

type MeasureUnitOptions = {
  baseUnit: UnitName | null
  measureName: MeasureName
  options: Array<Option>
}

type Returned = Array<MeasureUnitOptions>

export const useAllMeasuresUnitOptions = (): Returned => {
  const { t } = useTranslation()
  const { measures, systemsOfMeasurements } = useExplorerSectionMetadata() ?? {}

  return useMemo<Returned>(() => {
    if (Objects.isEmpty(measures)) return []

    return measures.map((measure) => {
      const system = systemsOfMeasurements?.[measure.systemName]

      let options: Array<Option> = []
      if (!Objects.isEmpty(system)) {
        options = Object.values(system.units).map((unit) => ({
          label: t(`unit.${unit.name}`),
          value: unit.name,
        }))
      }
      const baseUnit = system?.baseUnitName ?? null

      return {
        baseUnit,
        measureName: measure.name,
        options,
      }
    })
  }, [measures, systemsOfMeasurements, t])
}
