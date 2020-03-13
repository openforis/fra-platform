// ==== application paths
export const root = '/'
export const login = '/login/'
export const statisticalFactsheets = '/statisticalFactsheets/'
export const country = '/:countryIso/'
export const assessmentSection = `${country}assessment/:assessmentType/:section/`
export const odp = `${country}odp/:tab/`

// ==== getter utilities
export const getAssessmentSectionLink = (countryIso, assessmentType, sectionName) =>
  `/${countryIso}/assessment/${assessmentType}/${sectionName}/`

export const getOdpLink = (countryIso, sectionName, odpId = null) =>
  `/${countryIso}/odp/${sectionName}/${odpId ? `${odpId}/` : ''}`
