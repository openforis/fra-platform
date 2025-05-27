import { SystemOfMeasurementName } from 'meta/measurement/systemOfMeasurement'
import { Unit } from 'meta/measurement/unit'

type UnitWithFactor = Omit<Unit, 'uuid'> & {
  conversionFactor?: number
}

type SystemOfMeasurementSeed = Record<
  SystemOfMeasurementName,
  {
    units: Array<UnitWithFactor>
  }
>

export const systemsOfMeasurement: SystemOfMeasurementSeed = {
  [SystemOfMeasurementName.area]: {
    units: [
      { name: 'haThousand', symbol: '1000 ha', conversionFactor: 1 },
      { name: 'ha', symbol: 'ha', conversionFactor: 1000 },
      { name: 'kmSq', symbol: 'km²', conversionFactor: 10 },
      { name: 'mileSq', symbol: 'mi²', conversionFactor: 3.86102 },
      { name: 'acre1000', symbol: '1000 ac', conversionFactor: 2.47105 },
      { name: 'acre', symbol: 'ac', conversionFactor: 2471.05 },
      { name: 'haMillion', symbol: '1000000 ha', conversionFactor: 0.001 },
    ],
  },
  [SystemOfMeasurementName.areaPerYear]: {
    units: [{ name: 'haThousandPerYear', symbol: '1000ha/year', conversionFactor: 1 }],
  },
  [SystemOfMeasurementName.volume]: {
    units: [{ name: 'millionCubicMeter', symbol: '1000000m³', conversionFactor: 1 }],
  },
  [SystemOfMeasurementName.volumePerArea]: {
    units: [{ name: 'cubicMeterPerHa', symbol: 'm³/ha', conversionFactor: 1 }],
  },
}
