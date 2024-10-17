import * as admin from './fr/admin.json'
import * as area from './fr/area.json'
import * as assessmentSection from './fr/assessmentSection.json'
import * as common from './fr/common.json'
import * as contentCheck from './fr/contentCheck.json'
import * as dataDownload from './fr/dataDownload.json'
import * as dataSource from './fr/dataSource.json'
import * as editUser from './fr/editUser.json'
import * as email from './fr/email.json'
import * as fra from './fr/fra.json'
import * as generalValidation from './fr/generalValidation.json'
import * as geo from './fr/geo.json'
import * as history from './fr/history.json'
import * as landing from './fr/landing.json'
import * as login from './fr/login.json'
import * as nationalDataPoint from './fr/nationalDataPoint.json'
import * as other from './fr/other.json'
import * as statisticalFactsheets from './fr/statisticalFactsheets.json'
import * as uc from './fr/uc.json'

export const frTranslation = {
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
