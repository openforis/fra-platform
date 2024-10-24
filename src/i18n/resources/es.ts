import * as admin from './es/admin.json'
import * as area from './es/area.json'
import * as assessmentSection from './es/assessmentSection.json'
import * as common from './es/common.json'
import * as contentCheck from './es/contentCheck.json'
import * as dataDownload from './es/dataDownload.json'
import * as dataSource from './es/dataSource.json'
import * as editUser from './es/editUser.json'
import * as email from './es/email.json'
import * as fra from './es/fra.json'
import * as generalValidation from './es/generalValidations.json'
import * as history from './es/history.json'
import * as landing from './es/landing.json'
import * as login from './es/login.json'
import * as nationalDataPoint from './es/nationalDataPoint.json'
import * as other from './es/other.json'
import * as statisticalFactsheets from './es/statisticalFactsheets.json'
import * as uc from './es/uc.json'

export const esTranslation = {
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
