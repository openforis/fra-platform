import { createSelector } from '@reduxjs/toolkit'

import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { TableNames } from 'meta/assessment/table'
import { RecordAssessmentDatas } from 'meta/data/recordDatas'

import { RootState } from 'client/store/types'

const getState = (state: RootState) => state.data.tableData

const getRecordAssessmentData = createSelector(getState, (data) => data.nodeValues)

const getOriginalDataPointData = createSelector(
  [
    getRecordAssessmentData,
    (_, assessmentName: AssessmentName) => assessmentName,
    (_, __, cycleName: CycleName) => cycleName,
    (_, __, ___, countryIso: CountryIso) => countryIso,
  ],
  (data, assessmentName, cycleName, countryIso) => {
    const tableName = TableNames.originalDataPointValue
    return RecordAssessmentDatas.getTableData({ assessmentName, cycleName, data, countryIso, tableName })
  }
)

export const NodeValuesSelectors = {
  getRecordAssessmentData,
  getOriginalDataPointData,
}
