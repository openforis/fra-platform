const admin = require('./en/admin')
const area = require('./en/area')
const assessmentSection = require('./en/assessmentSection')
const bulkDownload = require('./en/bulkDownload')
const common = require('./en/common')
const contentCheck = require('./en/contentCheck')
const dataDownload = require('./en/dataDownload')
const dataSource = require('./en/dataSource')
const email = require('./en/email')
const fra = require('./en/fra')
const generalValidation = require('./en/generalValidation')
const geo = require('./en/geo')
const history = require('./en/history')
const landing = require('./en/landing')
const login = require('./en/login')
const other = require('./en/other')
const panEuropean = require('./en/panEuropean/panEuropean')
const statisticalFactsheets = require('./en/statisticalFactsheets')
const uc = require('./en/uc')
const validation = require('./en/validation')

module.exports.translation = {
  admin,
  area,
  bulkDownload,
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

  panEuropean,
  statisticalFactsheets,
  uc,
  validation,

  ...other,
}
