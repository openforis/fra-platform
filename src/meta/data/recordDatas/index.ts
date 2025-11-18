import { getAssessmentData } from 'meta/data/recordDatas/getAssessmentData'
import { getCountryData } from 'meta/data/recordDatas/getCountryData'
import { getCycleData } from 'meta/data/recordDatas/getCycleData'
import { getDatum } from 'meta/data/recordDatas/getDatum'
import { getNodeValue } from 'meta/data/recordDatas/getNodeValue'
import { getTableData } from 'meta/data/recordDatas/getTableData'
import { hasErrors } from 'meta/data/recordDatas/hasErrors'
import { isTableDataEmpty } from 'meta/data/recordDatas/isTableDataEmpty'
import { isVariableDataEmpty } from 'meta/data/recordDatas/isVariableDataEmpty'
import { mergeData } from 'meta/data/recordDatas/mergeData'
import { updateDatum } from 'meta/data/recordDatas/updateDatum'
import { updateDatumValidation } from 'meta/data/recordDatas/updateDatumValidation'

import { mergeRecordTableData } from './mergeRecordTableData'

export const RecordAssessmentDatas = {
  getAssessmentData,
  getCountryData,
  getCycleData,
  getDatum,
  getNodeValue,
  getTableData,
  hasErrors,
  isTableDataEmpty,
  isVariableDataEmpty,
  mergeData,
  mergeRecordTableData,

  updateDatum,
  updateDatumValidation,
}
