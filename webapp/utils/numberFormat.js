export const separateThousandsWithSpaces = num =>
  num
    ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    : ''
