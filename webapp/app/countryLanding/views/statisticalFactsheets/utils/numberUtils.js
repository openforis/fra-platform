export const formatValue = (value, isIsoCountry) => (isIsoCountry ? value : (value / 1000).toFixed(2))
