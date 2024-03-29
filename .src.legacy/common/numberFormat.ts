import { Numbers } from '@utils/numbers'

export const formatInteger = (num: any) => Numbers.format(num, 0)

export const formatDecimal = (num: any) => Numbers.format(num, 2)

export default {
  formatDecimal,
  formatInteger,
}
