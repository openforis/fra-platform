import { formatNumber } from '../../common/bignumberUtils'

export const formatInteger = num => formatNumber(num, 0)

export const formatDecimal = num => formatNumber(num, 2)
