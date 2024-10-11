const admin = require('./es/admin')
const area = require('./es/area')
const assessmentSection = require('./es/assessmentSection')
const common = require('./es/common')
const contentCheck = require('./es/contentCheck')
const dataDownload = require('./es/dataDownload')
const dataSource = require('./es/dataSource')
const editUser = require('./es/editUser')
const email = require('./es/email')
const fra = require('./es/fra')
const generalValidation = require('./es/generalValidations')
const history = require('./es/history')
const landing = require('./es/landing')
const login = require('./es/login')
const other = require('./es/other')
const statisticalFactsheets = require('./es/statisticalFactsheets')
const uc = require('./es/uc')

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

  page: {
    assessmentSection,
  },

  statisticalFactsheets,
  uc,

  ...other,
}
