import { formatNumber } from '../../common/bignumberUtils'

export const formatInteger = num => formatNumber(num, 0)

export const formatDecimal = (num, precision = 2) => formatNumber(num, precision)
