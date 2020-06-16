import * as NumberUtils from '@common/bignumberUtils'

export const units = {
  haThousand: '1000ha',
}

export const factors = {
  [units.haThousand]: {
    ha: 1000,
    kmSq: 10,
    mileSq: 3.86102,
    acre1000: 2.47105,
    acre: 2471.05,
    haMillion: 0.001,
  },
}

export const convert = (value, unit, factor) => NumberUtils.formatNumber(NumberUtils.mul(value, factors[unit][factor]))
