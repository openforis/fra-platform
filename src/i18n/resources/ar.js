const admin = require('./ar/admin.json')
const area = require('./ar/area.json')
const assessmentSection = require('./ar/assessmentSection.json')
const common = require('./ar/common.json')
const contentCheck = require('./ar/contentCheck.json')
const dataDownload = require('./ar/dataDownload.json')
const dataSource = require('./ar/dataSource.json')
const editUser = require('./ar/editUser.json')
const email = require('./ar/email.json')
const fra = require('./ar/fra.json')
const generalValidation = require('./ar/generalValidation.json')
const geo = require('./ar/geo.json')
const history = require('./ar/history.json')
const landing = require('./ar/landing.json')
const login = require('./ar/login.json')
const nationalDataPoint = require('./ar/nationalDataPoint.json')
const other = require('./ar/other.json')
const statisticalFactsheets = require('./ar/statisticalFactsheets.json')
const uc = require('./ar/uc.json')

module.exports.translation = {
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
