// ###### ROUTES:
// #### ROOT
// /
//
// #### Admin
// /admin
// /admin/usersManagement/
// /admin/dataExport/
// /admin/versioning/
//
// #### User
// /user/:userId
//
// #### Login
// /login
// /login/resetPassword
//
// #### Assessment
// /:countryIso/:assessmentType/print/
// /:countryIso/:assessmentType/print/onlyTables/
// /:countryIso/:assessmentType/home/
// /:countryIso/:assessmentType/home/:section/
// /:countryIso/:assessmentType/:section/
// /:countryIso/odp/
// /:countryIso/odp/:tab/

const FRAGMENTS = {
  admin: 'admin',
  api: 'api',
  home: 'home',
  login: 'login',
  odp: 'odp',
  onlyTables: 'onlyTables',
  print: 'print',
  profilePicture: 'profilePicture',
  resetPassword: 'resetPassword',
  user: 'user',
  users: 'users',
  versioning: 'versioning',
}
const PARAMS = {
  countryIso: ':countryIso',
  assessmentType: ':assessmentType',
  section: ':section',
  userId: ':userId',
  tab: ':tab',
  levelIso: ':levelIso',
}

/**
 * Returns consistent URL strings starting and ending with /
 *
 * @param {string[]} parts - url parts from which the url is generated
 */
const _generate = (...parts) => `/${parts.filter((p) => !!p).join('/')}/`

/**
 * @deprecated
 */
export const country = _generate(PARAMS.countryIso)
/**
 * @deprecated
 */
export const getCountryHomeLink = (countryIso) => _generate(countryIso)

// ==== Root
export const root = '/'

// ==== Admin
export const admin = _generate(FRAGMENTS.admin)

export const getAdminVersioningLink = () => _generate(FRAGMENTS.admin, FRAGMENTS.versioning)

// ==== User
export const user = _generate(FRAGMENTS.users, PARAMS.userId)

export const getUserProfileLink = (userId) => _generate(FRAGMENTS.users, userId)

// ==== Login
export const login = _generate(FRAGMENTS.login)
export const resetPassword = _generate(FRAGMENTS.login, FRAGMENTS.resetPassword)

// ==== Assessment
export const assessment = _generate(PARAMS.countryIso, PARAMS.assessmentType)
export const assessmentHome = _generate(PARAMS.countryIso, PARAMS.assessmentType, FRAGMENTS.home)
export const assessmentSection = _generate(PARAMS.countryIso, PARAMS.assessmentType, PARAMS.section)
export const assessmentPrint = _generate(PARAMS.countryIso, PARAMS.assessmentType, FRAGMENTS.print)
export const assessmentPrintOnlyTables = _generate(
  PARAMS.countryIso,
  PARAMS.assessmentType,
  FRAGMENTS.print,
  FRAGMENTS.onlyTables
)

export const getAssessmentHomeLink = (countryIso, assessmentType) =>
  _generate(countryIso, assessmentType, FRAGMENTS.home)

export const getAssessmentHomeSectionLink = (countryIso, assessmentType, section) =>
  _generate(countryIso, assessmentType, FRAGMENTS.home, section)

export const getAssessmentSectionLink = (countryIso, assessmentType, sectionName) =>
  _generate(countryIso, assessmentType, sectionName)

export const getAssessmentPrintLink = (countryIso, assessmentType, onlyTables = false) =>
  _generate(countryIso, assessmentType, FRAGMENTS.print, onlyTables && FRAGMENTS.onlyTables)

// ==== Assessment ODP
export const odp = _generate(PARAMS.countryIso, FRAGMENTS.odp, PARAMS.tab)
export const getOdpLink = (countryIso, sectionName, odpId) => _generate(countryIso, FRAGMENTS.odp, sectionName, odpId)

// /api/users/:countryIso/user/:userId/profilePicture
export const getUserProfilePictureLink = (countryIso, userId) =>
  _generate(FRAGMENTS.api, FRAGMENTS.users, countryIso, FRAGMENTS.user, userId, FRAGMENTS.profilePicture)
