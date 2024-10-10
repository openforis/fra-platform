const admin = require('./zh/admin')
const area = require('./zh/area')
const assessmentSection = require('./zh/assessmentSection')
const common = require('./zh/common')
const contentCheck = require('./zh/contentCheck')
const dataDownload = require('./zh/dataDownload')
const dataSource = require('./zh/dataSource')
const email = require('./zh/email')
const fra = require('./zh/fra')
const generalValidation = require('./zh/generalValidation')
const geo = require('./zh/geo')
const history = require('./zh/history')
const landing = require('./zh/landing')
const login = require('./zh/login')
const other = require('./zh/other')
const statisticalFactsheets = require('./zh/statisticalFactsheets')
const uc = require('./zh/uc')

module.exports.translation = {
  admin,
  area,
  common,
  contentCheck,
  dataDownload,
  dataSource,
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
