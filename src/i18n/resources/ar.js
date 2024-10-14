const admin = require('./ar/admin')
const area = require('./ar/area')
const assessmentSection = require('./ar/assessmentSection')
const common = require('./ar/common')
const contentCheck = require('./ar/contentCheck')
const dataDownload = require('./ar/dataDownload')
const dataSource = require('./ar/dataSource')
const editUser = require('./ar/editUser')
const email = require('./ar/email')
const fra = require('./ar/fra')
const generalValidation = require('./ar/generalValidation')
const geo = require('./ar/geo')
const history = require('./ar/history')
const landing = require('./ar/landing')
const login = require('./ar/login')
const nationalDataPoint = require('./ar/nationalDataPoint')
const other = require('./ar/other')
const statisticalFactsheets = require('./ar/statisticalFactsheets')
const uc = require('./ar/uc')

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
