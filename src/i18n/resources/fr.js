const admin = require('./fr/admin')
const area = require('./fr/area')
const assessmentSection = require('./fr/assessmentSection')
const common = require('./fr/common')
const contentCheck = require('./fr/contentCheck')
const dataDownload = require('./fr/dataDownload')
const dataSource = require('./fr/dataSource')
const editUser = require('./fr/editUser')
const email = require('./fr/email')
const fra = require('./fr/fra')
const generalValidation = require('./fr/generalValidation')
const geo = require('./fr/geo')
const history = require('./fr/history')
const landing = require('./fr/landing')
const login = require('./fr/login')
const nationalDataPoint = require('./fr/nationalDataPoint')
const other = require('./fr/other')
const statisticalFactsheets = require('./fr/statisticalFactsheets')
const uc = require('./fr/uc')

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
