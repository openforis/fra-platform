/*
  ###### ROUTES:
  #### Root
  /

  #### Admin
  /admin
  /admin/usersManagement/
  /admin/dataExport/
  /admin/versioning/

  #### User
  /users/:userId

  #### Login
  /login
  /login/resetPassword

  #### Assessment
  /:countryIso/:assessmentType/print/
  /:countryIso/:assessmentType/print/onlyTables/
  /:countryIso/:assessmentType/home/
  /:countryIso/:assessmentType/home/:section/
  /:countryIso/:assessmentType/:section/
  /:countryIso/:assessmentType/odp/
  /:countryIso/:assessmentType/odp/:tab/
*/

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
export const PARAMS = {
  countryIso: ':countryIso',
  assessmentType: ':assessmentType',
  section: ':section',
  userId: ':userId',
  tab: ':tab',
  levelIso: ':levelIso',
  odpId: ':odpId',
}

/**
 * Returns consistent URL strings starting and ending with /
 *
 * @param {string[]} parts - url parts from which the url is generated
 */
const _generate = (...parts: any[]) => `/${parts.filter(Boolean).join('/')}/`

const _split = (path: any) => path.split('/').filter(Boolean)
/**
 * @deprecated
 */
export const country = _generate(PARAMS.countryIso)

// ==== Root
export const root = '/'

// ==== Admin
export const admin = _generate(FRAGMENTS.admin)

export const getAdminVersioningLink = () => _generate(FRAGMENTS.admin, FRAGMENTS.versioning)

// ==== User
export const user = _generate(FRAGMENTS.users, PARAMS.userId)

export const getUserProfileLink = (userId: any) => _generate(FRAGMENTS.users, userId)

// TODO: introduce API
// /api/users/user/:userId/profilePicture
export const getUserProfilePictureLink = (userId: any) =>
  _generate(FRAGMENTS.api, FRAGMENTS.users, FRAGMENTS.user, userId, FRAGMENTS.profilePicture)

// ==== Login
export const login = _generate(FRAGMENTS.login)
export const resetPassword = _generate(FRAGMENTS.login, FRAGMENTS.resetPassword)

// ==== Assessment
export const assessment = _generate(PARAMS.countryIso, PARAMS.assessmentType)
export const assessmentHome = _generate(..._split(assessment), FRAGMENTS.home)
export const assessmentSection = _generate(..._split(assessment), PARAMS.section)
export const assessmentPrint = _generate(..._split(assessment), FRAGMENTS.print)
export const assessmentPrintOnlyTables = _generate(..._split(assessmentPrint), FRAGMENTS.onlyTables)

export const getAssessmentHomeLink = (countryIso: any, assessmentType: any) =>
  _generate(countryIso, assessmentType, FRAGMENTS.home)

export const getAssessmentHomeSectionLink = (countryIso: any, assessmentType: any, section: any) =>
  _generate(countryIso, assessmentType, FRAGMENTS.home, section)

export const getAssessmentSectionLink = (countryIso: any, assessmentType: any, sectionName: any) =>
  _generate(countryIso, assessmentType, sectionName)

export const getAssessmentPrintLink = (countryIso: any, assessmentType: any, onlyTables = false) =>
  _generate(countryIso, assessmentType, FRAGMENTS.print, onlyTables && FRAGMENTS.onlyTables)

// ==== Assessment ODP
export const odp = _generate(PARAMS.countryIso, PARAMS.assessmentType, FRAGMENTS.odp, PARAMS.tab)
export const getOdpLink = (countryIso: any, assessmentType: any, sectionName: any, odpId: any) =>
  _generate(countryIso, assessmentType, FRAGMENTS.odp, sectionName, odpId)
