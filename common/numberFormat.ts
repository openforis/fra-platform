import { Numbers } from '@core/utils/numbers'

export const formatInteger = (num: any) => Numbers.formatNumber(num, 0)

export const formatDecimal = (num: any) => Numbers.formatNumber(num, 2)

export default {
  formatDecimal,
  formatInteger,
}
