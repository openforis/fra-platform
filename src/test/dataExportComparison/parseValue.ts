import { Numbers } from '@utils/numbers'

export const parseValue = (val: string): number => Math.abs(Number(Numbers.toFixed(Number(val))))
