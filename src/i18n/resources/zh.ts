/* eslint-disable @typescript-eslint/no-var-requires */
const admin = require('./zh/admin.json')
const area = require('./zh/area.json')
const assessmentSection = require('./zh/assessmentSection.json')
const common = require('./zh/common.json')
const contentCheck = require('./zh/contentCheck.json')
const dataDownload = require('./zh/dataDownload.json')
const dataSource = require('./zh/dataSource.json')
const editUser = require('./zh/editUser.json')
const email = require('./zh/email.json')
const fra = require('./zh/fra.json')
const generalValidation = require('./zh/generalValidation.json')
const geo = require('./zh/geo.json')
const history = require('./zh/history.json')
const landing = require('./zh/landing.json')
const login = require('./zh/login.json')
const nationalDataPoint = require('./zh/nationalDataPoint.json')
const other = require('./zh/other.json')
const statisticalFactsheets = require('./zh/statisticalFactsheets.json')
const uc = require('./zh/uc.json')

export const zhTranslation = {
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
