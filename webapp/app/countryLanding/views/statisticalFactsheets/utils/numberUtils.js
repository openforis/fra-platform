import { sections } from '@webapp/app/countryLanding/views/statisticalFactsheets/utils/apiUtils'

export const formatValue = (value, isIsoCountry, rowName = '') => {
  if (isIsoCountry) {
    return value
  }

  if (rowName.match(/carbon_stock_*/)) {
    return (value / 1000000).toFixed(2)
  }

  if (sections.primaryDesignatedManagementObjective.includes(rowName)) {
    return value
  }

  return (value / 1000).toFixed(2)
}
