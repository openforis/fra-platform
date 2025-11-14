import { Numbers } from 'utils/numbers'

import { SystemOfMeasurementName } from 'meta/measurement/systemOfMeasurement'

type Props = {
  systemName: SystemOfMeasurementName
  value: string
}

export const formatValue = (props: Props): string => {
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
