const admin = require('./es/admin.json')
const area = require('./es/area.json')
const assessmentSection = require('./es/assessmentSection.json')
const common = require('./es/common.json')
const contentCheck = require('./es/contentCheck.json')
const dataDownload = require('./es/dataDownload.json')
const dataSource = require('./es/dataSource.json')
const editUser = require('./es/editUser.json')
const email = require('./es/email.json')
const fra = require('./es/fra.json')
const generalValidation = require('./es/generalValidations.json')
const history = require('./es/history.json')
const landing = require('./es/landing.json')
const login = require('./es/login.json')
const nationalDataPoint = require('./es/nationalDataPoint.json')
const other = require('./es/other.json')
const statisticalFactsheets = require('./es/statisticalFactsheets.json')
const uc = require('./es/uc.json')

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
