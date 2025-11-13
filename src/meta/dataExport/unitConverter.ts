import { Numbers } from 'utils/numbers'

import { UnitFactors } from 'meta/dataExport/unitFactor'

export const UnitConverter = {
  convertValue: (value: number | string, unit: string, factor: string): string =>
    Numbers.format(Numbers.mul(value, UnitFactors[unit][factor])) as string,
}
