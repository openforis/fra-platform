const pathFragments = {
  admin: 'admin',
  api: 'api',
  assessment: 'assessment',
  login: 'login',
  odp: 'odp',
  onlyTables: 'onlyTables',
  print: 'print',
  profilePicture: 'profilePicture',
  statisticalFactsheets: 'statisticalFactsheets',
  export: 'export',
  user: 'user',
  users: 'users',
  versioning: 'versioning',
  params: {
    countryIso: ':countryIso',
    assessmentType: ':assessmentType',
    section: ':section',
    userId: ':userId',
    tab: ':tab',
    levelIso: ':levelIso',
  },
}

/**
 * Returns consistent URL strings starting and ending with /
 *
 * @param {string[]} parts - url parts from which the url is generated
 */
const _pathGenerator = (...parts) => `/${parts.filter((p) => !!p).join('/')}/`

// ==== application paths
export const root = '/'
export const login = _pathGenerator(pathFragments.login)
export const statisticalFactsheets = _pathGenerator(pathFragments.statisticalFactsheets)
export const statisticalFactsheetsLevelIso = _pathGenerator(
  pathFragments.statisticalFactsheets,
  pathFragments.params.levelIso
)

export const dataExport = _pathGenerator(pathFragments.export)
export const dataExportSection = _pathGenerator(
  pathFragments.export,
  pathFragments.params.assessmentType,
  pathFragments.params.section
)
export const country = _pathGenerator(pathFragments.params.countryIso)
export const admin = _pathGenerator(pathFragments.admin)

// /:countryIso/assessment/:assessmentType/:section/
export const assessmentSection = _pathGenerator(
  pathFragments.params.countryIso,
  pathFragments.assessment,
  pathFragments.params.assessmentType,
  pathFragments.params.section
)

// /:countryIso/print/:assessmentType/
export const assessmentPrint = _pathGenerator(
  pathFragments.params.countryIso,
  pathFragments.print,
  pathFragments.params.assessmentType
)

// /:countryIso/print/:assessmentType/onlyTables/
export const assessmentPrintOnlyTables = _pathGenerator(
  pathFragments.params.countryIso,
  pathFragments.print,
  pathFragments.params.assessmentType,
  pathFragments.onlyTables
)

// /:countryIso/odp/:tab/
export const odp = _pathGenerator(pathFragments.params.countryIso, pathFragments.odp, pathFragments.params.tab)

// /users/:userId/
export const user = _pathGenerator(pathFragments.users, pathFragments.params.userId)

// ==== getter utilities
// /:countryIso/
export const getCountryHomeLink = (countryIso) => _pathGenerator(countryIso)

// /:countryIso/assessment/:assessmentType/:sectionName/
export const getAssessmentSectionLink = (countryIso, assessmentType, sectionName) =>
  _pathGenerator(countryIso, pathFragments.assessment, assessmentType, sectionName)

// /:countryIso/print/:assessmentType/
export const getAssessmentPrintLink = (countryIso, assessmentType, onlyTables = false) =>
  _pathGenerator(countryIso, pathFragments.print, assessmentType, onlyTables && pathFragments.onlyTables)

// /:countryIso/odp/:sectionName/:odpId/
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

// /export/:assessmentType/:section/
export const getDataExportSectionLink = (assessmentType, section) =>
  _pathGenerator(pathFragments.export, assessmentType, section)

export const getStatisticalFactsheetsWithLevelIso = (levelIso) =>
  _pathGenerator(pathFragments.statisticalFactsheets, levelIso)
