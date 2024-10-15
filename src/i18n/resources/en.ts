import * as admin from './en/admin.json'
import * as area from './en/area.json'
import * as assessmentSection from './en/assessmentSection.json'
import * as bulkDownload from './en/bulkDownload.json'
import * as common from './en/common.json'
import * as contentCheck from './en/contentCheck.json'
import * as dataDownload from './en/dataDownload.json'
import * as dataSource from './en/dataSource.json'
import * as editUser from './en/editUser.json'
import * as email from './en/email.json'
import * as fra from './en/fra.json'
import * as generalValidation from './en/generalValidation.json'
import * as geo from './en/geo.json'
import * as history from './en/history.json'
import * as landing from './en/landing.json'
import * as login from './en/login.json'
import * as nationalDataPoint from './en/nationalDataPoint.json'
import * as other from './en/other.json'
import * as panEuropean from './en/panEuropean/panEuropean.json'
import * as statisticalFactsheets from './en/statisticalFactsheets.json'
import * as uc from './en/uc.json'
import * as validation from './en/validation.json'

export const enTranslation = {
  admin,
  area,
  bulkDownload,
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

  panEuropean,
  statisticalFactsheets,
  uc,
  validation,

  ...other,
}
