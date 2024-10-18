import * as admin from './ru/admin.json'
import * as area from './ru/area.json'
import * as assessmentSection from './ru/assessmentSection.json'
import * as common from './ru/common.json'
import * as contentCheck from './ru/contentCheck.json'
import * as dataDownload from './ru/dataDownload.json'
import * as dataSource from './ru/dataSource.json'
import * as editUser from './ru/editUser.json'
import * as email from './ru/email.json'
import * as fra from './ru/fra.json'
import * as generalValidation from './ru/generalValidation.json'
import * as geo from './ru/geo.json'
import * as history from './ru/history.json'
import * as landing from './ru/landing.json'
import * as login from './ru/login.json'
import * as nationalDataPoint from './ru/nationalDataPoint.json'
import * as other from './ru/other.json'
import * as statisticalFactsheets from './ru/statisticalFactsheets.json'
import * as uc from './ru/uc.json'

export const ruTranslation = {
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
