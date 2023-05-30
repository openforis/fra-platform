import { getAssessmentData } from '@meta/data/recordAssessmentDatas/getAssessmentData'
import { getCountryData } from '@meta/data/recordAssessmentDatas/getCountryData'
import { getCycleData } from '@meta/data/recordAssessmentDatas/getCycleData'
import { getDatum } from '@meta/data/recordAssessmentDatas/getDatum'
import { getNodeValue } from '@meta/data/recordAssessmentDatas/getNodeValue'
import { getTableData } from '@meta/data/recordAssessmentDatas/getTableData'
import { hasErrors } from '@meta/data/recordAssessmentDatas/hasErrors'
import { isTableDataEmpty } from '@meta/data/recordAssessmentDatas/isTableDataEmpty'
import { mergeData } from '@meta/data/recordAssessmentDatas/mergeData'
import { updateDatum } from '@meta/data/recordAssessmentDatas/updateDatum'
import { updateDatumValidation } from '@meta/data/recordAssessmentDatas/updateDatumValidation'

export const RecordAssessmentDatas = {
  getDatum,
  getNodeValue,
  getAssessmentData,
  getCycleData,
  getCountryData,
  getTableData,
  hasErrors,
  isTableDataEmpty,
  mergeData,

  updateDatum,
  updateDatumValidation,
}
