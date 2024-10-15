/* eslint-disable @typescript-eslint/no-var-requires */
const admin = require('./en/admin.json')
const area = require('./en/area.json')
const assessmentSection = require('./en/assessmentSection.json')
const bulkDownload = require('./en/bulkDownload.json')
const common = require('./en/common.json')
const contentCheck = require('./en/contentCheck.json')
const dataDownload = require('./en/dataDownload.json')
const dataSource = require('./en/dataSource.json')
const editUser = require('./en/editUser.json')
const email = require('./en/email.json')
const fra = require('./en/fra.json')
const generalValidation = require('./en/generalValidation.json')
const geo = require('./en/geo.json')
const history = require('./en/history.json')
const landing = require('./en/landing.json')
const login = require('./en/login.json')
const nationalDataPoint = require('./en/nationalDataPoint.json')
const other = require('./en/other.json')
const panEuropean = require('./en/panEuropean/panEuropean.json')
const statisticalFactsheets = require('./en/statisticalFactsheets.json')
const uc = require('./en/uc.json')
const validation = require('./en/validation.json')

export const enTranslation = {
  admin,
  area,
  bulkDownload,
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

  panEuropean,
  statisticalFactsheets,
  uc,
  validation,

  ...other,
}
