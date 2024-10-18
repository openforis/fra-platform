import * as admin from './zh/admin.json'
import * as area from './zh/area.json'
import * as assessmentSection from './zh/assessmentSection.json'
import * as common from './zh/common.json'
import * as contentCheck from './zh/contentCheck.json'
import * as dataDownload from './zh/dataDownload.json'
import * as dataSource from './zh/dataSource.json'
import * as editUser from './zh/editUser.json'
import * as email from './zh/email.json'
import * as fra from './zh/fra.json'
import * as generalValidation from './zh/generalValidation.json'
import * as geo from './zh/geo.json'
import * as history from './zh/history.json'
import * as landing from './zh/landing.json'
import * as login from './zh/login.json'
import * as nationalDataPoint from './zh/nationalDataPoint.json'
import * as other from './zh/other.json'
import * as statisticalFactsheets from './zh/statisticalFactsheets.json'
import * as uc from './zh/uc.json'

export const zhTranslation = {
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
