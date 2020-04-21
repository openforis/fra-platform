// ==== application paths
export const root = '/'
export const login = '/login/'
export const statisticalFactsheets = '/statisticalFactsheets/'
export const country = '/:countryIso/'
export const assessmentSection = `${country}assessment/:assessmentType/:section/`
export const assessmentPrint = `${country}print/:assessmentType/`
export const assessmentPrintOnlyTables = `${country}print/:assessmentType/onlyTables/`
export const odp = `${country}odp/:tab/`
export const user = '/users/:userId/'
// ==== getter utilities

export const getCountryHomeLink = (countryIso) => `/${countryIso}/`

export const getAssessmentSectionLink = (countryIso, assessmentType, sectionName) =>
  `/${countryIso}/assessment/${assessmentType}/${sectionName}/`

export const getAssessmentPrintLink = (countryIso, assessmentType, onlyTables = false) =>
  `/${countryIso}/print/${assessmentType}/${onlyTables ? 'onlyTables/' : ''}`

export const getOdpLink = (countryIso, sectionName, odpId = null) =>
  `/${countryIso}/odp/${sectionName}/${odpId ? `${odpId}/` : ''}`

export const getUserProfilePictureLink = (countryIso, userId) =>
  `/api/users/${countryIso}/user/${userId}/profilePicture`

export const getUserLink = (userId) => `/users/${userId}`
