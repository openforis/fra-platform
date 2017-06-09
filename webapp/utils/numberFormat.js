export const separateThousandsWithSpaces = num =>
  typeof num === 'number'
    ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    : ''
