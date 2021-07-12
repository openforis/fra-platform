import { addClassData } from '@server/repository/odpClass/addClassData'
import { getOdpNationalClasses } from '@server/repository/odpClass/getOdpNationalClasses'
import { wipeClassData } from '@server/repository/odpClass/wipeClassData'
import { wipeNationalClassIssues } from '@server/repository/odpClass/wipeNationalClassIssues'

export const OdpClassRepository = {
  addClassData,
  getOdpNationalClasses,
  wipeClassData,
  wipeNationalClassIssues,
}
