import { Numbers } from 'utils/numbers'

import { SystemOfMeasurementName } from '../systemOfMeasurement'

type FormatValueProps = {
  systemName: SystemOfMeasurementName
  value: string
}

const formatValue = (props: FormatValueProps): string => {
  const { systemName, value } = props

  if (
    [
      SystemOfMeasurementName.area,
      SystemOfMeasurementName.areaPerYear,
      SystemOfMeasurementName.mass,
      SystemOfMeasurementName.massPerArea,
      SystemOfMeasurementName.percent,
      SystemOfMeasurementName.percent,
      SystemOfMeasurementName.volume,
      SystemOfMeasurementName.volumePerArea,
    ].includes(systemName)
  ) {
    return Numbers.format(value, 2)
  }

  return value
}

export const Observations = {
  formatValue,
}
