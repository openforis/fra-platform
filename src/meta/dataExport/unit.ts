import { Numbers } from 'utils/numbers'

export interface UnitFactor extends Record<string, number> {
  haThousand: number
  ha: number
  kmSq: number
  mileSq: number
  acre1000: number
  acre: number
  haMillion: number
}

export const UnitFactors: Record<string, UnitFactor> = {
  haThousand: {
    haThousand: 1,
    ha: 1000,
    kmSq: 10,
    mileSq: 3.86102,
    acre1000: 2.47105,
    acre: 2471.05,
    haMillion: 0.001,
  },
}

export const UnitConverter = {
  convertValue: (value: number | string, unit: string, factor: string): string =>
    Numbers.format(Numbers.mul(value, UnitFactors[unit][factor])) as string,
}
