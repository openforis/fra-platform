// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as NumberUtils from '@common/bignumberUtils'

export const units = {
  haThousand: 'haThousand',
  haThousandPerYear: 'haThousandPerYear',
  tonnesPerHa: 'tonnesPerHa',
  millionsCubicMeterOverBark: 'millionsCubicMeterOverBark',
  fte1000: 'fte1000',
  numberOfStudents: 'numberOfStudents',
}

export const factors = {
  [units.haThousand]: {
    [units.haThousand]: 1,
    ha: 1000,
    kmSq: 10,
    mileSq: 3.86102,
    acre1000: 2.47105,
    acre: 2471.05,
    haMillion: 0.001,
  },
}

export const convert = (value: any, unit: any, factor: any) =>
  NumberUtils.formatNumber(NumberUtils.mul(value, factors[unit][factor]))
