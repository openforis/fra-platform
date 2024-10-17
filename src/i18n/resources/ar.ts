import * as admin from './ar/admin.json'
import * as anchors from './ar/anchors.json'
import * as area from './ar/area.json'
import * as assessmentSection from './ar/assessmentSection.json'
import * as common from './ar/common.json'
import * as contentCheck from './ar/contentCheck.json'
import * as dataDownload from './ar/dataDownload.json'
import * as dataSource from './ar/dataSource.json'
import * as editUser from './ar/editUser.json'
import * as email from './ar/email.json'
import * as fra from './ar/fra.json'
import * as generalValidation from './ar/generalValidation.json'
import * as geo from './ar/geo.json'
import * as history from './ar/history.json'
import * as landing from './ar/landing.json'
import * as login from './ar/login.json'
import * as nationalDataPoint from './ar/nationalDataPoint.json'
import * as other from './ar/other.json'
import * as statisticalFactsheets from './ar/statisticalFactsheets.json'
import * as uc from './ar/uc.json'

export const arTranslation = {
  admin,
  anchors,
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
