import { Unit } from 'meta/measurement/unit'

type UnitWithFactor = Omit<Unit, 'uuid'> & {
  conversionFactor?: number
}

type SystemOfMeasurementSeed = {
  [systemOfMeasurementName: string]: {
    units: Array<UnitWithFactor>
  }
}

export const systemsOfMeasurement: SystemOfMeasurementSeed = {
  area: {
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
}
