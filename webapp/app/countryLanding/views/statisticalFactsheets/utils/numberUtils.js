export const formatValue = (value, isIsoCountry, rowName = '') => {
  if (isIsoCountry) {
    return value
  }
  if (rowName.match(/carbon_stock_*/)) {
    return (value / 1000000).toFixed(2)
  }
  return (value / 1000).toFixed(2)
}
