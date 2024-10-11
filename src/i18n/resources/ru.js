const admin = require('./ru/admin')
const area = require('./ru/area')
const assessmentSection = require('./ru/assessmentSection')
const common = require('./ru/common')
const contentCheck = require('./ru/contentCheck')
const dataDownload = require('./ru/dataDownload')
const dataSource = require('./ru/dataSource')
const editUser = require('./ru/editUser')
const email = require('./ru/email')
const fra = require('./ru/fra')
const generalValidation = require('./ru/generalValidation')
const geo = require('./ru/geo')
const history = require('./ru/history')
const landing = require('./ru/landing')
const login = require('./ru/login')
const other = require('./ru/other')
const statisticalFactsheets = require('./ru/statisticalFactsheets')
const uc = require('./ru/uc')

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

  page: {
    assessmentSection,
  },

  statisticalFactsheets,
  uc,

  ...other,
}
