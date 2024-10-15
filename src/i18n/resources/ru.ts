/* eslint-disable @typescript-eslint/no-var-requires */
const admin = require('./ru/admin.json')
const area = require('./ru/area.json')
const assessmentSection = require('./ru/assessmentSection.json')
const common = require('./ru/common.json')
const contentCheck = require('./ru/contentCheck.json')
const dataDownload = require('./ru/dataDownload.json')
const dataSource = require('./ru/dataSource.json')
const editUser = require('./ru/editUser.json')
const email = require('./ru/email.json')
const fra = require('./ru/fra.json')
const generalValidation = require('./ru/generalValidation.json')
const geo = require('./ru/geo.json')
const history = require('./ru/history.json')
const landing = require('./ru/landing.json')
const login = require('./ru/login.json')
const nationalDataPoint = require('./ru/nationalDataPoint.json')
const other = require('./ru/other.json')
const statisticalFactsheets = require('./ru/statisticalFactsheets.json')
const uc = require('./ru/uc.json')

export const ruTranslation = {
  admin,
  area,
  common,
  contentCheck,
  dataDownload,
  dataSource,
  editUser,
  email,
  fra,
  generalValidation,
  geo,
  history,
  landing,
  login,
  nationalDataPoint,

  page: {
    assessmentSection,
  },

  statisticalFactsheets,
  uc,

  ...other,
}
