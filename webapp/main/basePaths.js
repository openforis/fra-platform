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
export const admin = '/admin/'

const pathFragments = {
  assessment: 'assessment',
  print: 'print',
  odp: 'odp',
  api: 'api',
  users: 'users',
  user: 'user',
  profilePicture: 'profilePicture',
  versioning: 'versioning',
  onlyTables: 'onlyTables',
  admin: 'admin',
}

// ==== getter utilities

/**
 * Returns consistent URL strings starting and ending with /
 *
 * @param {string[]} parts - url parts from which the url is generated
 */
const _pathGenerator = (...parts) => `/${parts.filter((p) => !!p).join('/')}/`

// /:countryIso
export const getCountryHomeLink = (countryIso) => _pathGenerator(countryIso)

// /:countryIso/assessment/:assessmentType/:sectionName/
export const getAssessmentSectionLink = (countryIso, assessmentType, sectionName) =>
  _pathGenerator(countryIso, pathFragments.assessment, assessmentType, sectionName)

// /:countryIso/print/:assessmentType/
export const getAssessmentPrintLink = (countryIso, assessmentType, onlyTables = false) =>
  _pathGenerator(countryIso, pathFragments.print, assessmentType, onlyTables && pathFragments.onlyTables)

// /:countryIso/print/:assessmentType/onlyTables/
export const getOdpLink = (countryIso, sectionName, odpId) =>
  _pathGenerator(countryIso, pathFragments.odp, sectionName, odpId)

// /api/users/:countryIso/user/:userId/profilePicture
export const getUserProfilePictureLink = (countryIso, userId) =>
  _pathGenerator(
    pathFragments.api,
    pathFragments.users,
    countryIso,
    pathFragments.user,
    userId,
    pathFragments.profilePicture
  )

// /users/:userId/
export const getUserProfileLink = (userId) => _pathGenerator(pathFragments.users, userId)

// /admin/versioning/
export const getAdminVersioningLink = () => _pathGenerator(pathFragments.admin, pathFragments.versioning)
