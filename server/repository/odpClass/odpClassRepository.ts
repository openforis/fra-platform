import { getOdpNationalClasses } from '@server/repository/odpClass/getOdpNationalClasses'
import { addClassData } from '@server/repository/odpClass/addClassData'
import { wipeClassData } from '@server/repository/odpClass/wipeClassData'
import { wipeNationalClassIssues } from '@server/repository/odpClass/wipeNationalClassIssues'

export default {
  getOdpNationalClasses,
  addClassData,
  wipeClassData,
  wipeNationalClassIssues,
}
