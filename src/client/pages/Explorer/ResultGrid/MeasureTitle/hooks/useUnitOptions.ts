import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import { MeasureName } from 'meta/measurement/measure'

import { useExplorerSectionMetadata } from 'client/store/explorer/metadata/hooks/metadata'
import { Option } from 'client/components/Inputs/Select'

type Props = {
  measureName: MeasureName
}

type Returned = Array<Option>

export const useUnitOptions = (props: Props): Returned => {
  const { measureName } = props

  const { t } = useTranslation()

  const { measures, systemsOfMeasurements } = useExplorerSectionMetadata() ?? {}

  return useMemo<Returned>(() => {
    if (Objects.isEmpty(measures)) return []

    const measure = measures.find((m) => m.name === measureName)
    const system = systemsOfMeasurements?.[measure.systemName]

    if (Objects.isEmpty(system)) return []

    return Object.values(system.units).map((unit) => ({
      label: t(`unit.${unit.name}`),
      value: unit.name,
    }))
  }, [measureName, measures, systemsOfMeasurements, t])
}
