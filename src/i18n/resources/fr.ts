/* eslint-disable @typescript-eslint/no-var-requires */
const admin = require('./fr/admin.json')
const area = require('./fr/area.json')
const assessmentSection = require('./fr/assessmentSection.json')
const common = require('./fr/common.json')
const contentCheck = require('./fr/contentCheck.json')
const dataDownload = require('./fr/dataDownload.json')
const dataSource = require('./fr/dataSource.json')
const editUser = require('./fr/editUser.json')
const email = require('./fr/email.json')
const fra = require('./fr/fra.json')
const generalValidation = require('./fr/generalValidation.json')
const geo = require('./fr/geo.json')
const history = require('./fr/history.json')
const landing = require('./fr/landing.json')
const login = require('./fr/login.json')
const nationalDataPoint = require('./fr/nationalDataPoint.json')
const other = require('./fr/other.json')
const statisticalFactsheets = require('./fr/statisticalFactsheets.json')
const uc = require('./fr/uc.json')

export const frTranslation = {
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
