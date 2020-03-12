// ==== application paths
export const root = '/'
export const login = '/login/'
export const country = '/:countryIso/'
export const statisticalFactsheets = '/statisticalFactsheets/'
export const assessmentSection = `${country}assessment/:assessmentType/:section/`

// ==== getter utilities
export const getAssessmentSectionLink = (countryIso, assessmentType, sectionName) =>
  `/${countryIso}/assessment/${assessmentType}/${sectionName}/`
