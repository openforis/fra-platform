import * as R from 'ramda'
import { toFixed } from '../../common/bignumberUtils'

export const separateThousandsWithSpaces = num => {
  const toFormat = toFixed(num, 0)
  return R.isNil(toFormat) ? '' : toFormat.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

export const separateDecimalThousandsWithSpaces = (num, prec = 2) => {
  const toFormat = toFixed(num, prec)
  return R.isNil(toFormat) ? '' : toFormat.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}
