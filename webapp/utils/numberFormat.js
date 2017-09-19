export const separateThousandsWithSpaces = num =>
  typeof num === 'number'
    ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    : ''

export const separateDecimalThousandsWithSpaces = num => {
  if (typeof num === 'number')
    return (num.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  if (typeof num === 'string') {
    return Number(num).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  }
  return ''
}
