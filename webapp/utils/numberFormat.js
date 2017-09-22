export const separateThousandsWithSpaces = num => {
  if (typeof num === 'number')
    return (num.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  if (typeof num === 'string') {
    return Number(num).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  }
  return ''
}

export const separateDecimalThousandsWithSpaces = (num, prec = 0) => {
  if (typeof num === 'number')
    return (num.toFixed(prec)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  if (typeof num === 'string') {
    return Number(num).toFixed(prec).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  }
  return ''
}
