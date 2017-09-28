import * as R from 'ramda'

export const separateThousandsWithSpaces = num =>
  typeof num === 'number'
    ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    : ''

export const separateDecimalThousandsWithSpaces = (num, prec = 2) => {
  const toFormat = typeof num === 'string' ? Number(num) : num
  return R.isNil(toFormat) ? '' : toFormat.toFixed(prec).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}
