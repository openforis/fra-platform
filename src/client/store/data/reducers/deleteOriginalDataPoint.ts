import { Draft, PayloadAction } from '@reduxjs/toolkit'

import { CountryIso } from 'meta/area'
import { AssessmentName, CycleName, TableNames } from 'meta/assessment'
import { RecordAssessmentDatas } from 'meta/data'

import { DataState } from 'client/store/data/stateType'

type Payload = {
  assessmentName: AssessmentName
  cycleName: CycleName
  countryIso: CountryIso
  year: string
}

export const deleteOriginalDataPoint = (state: Draft<DataState>, action: PayloadAction<Payload>) => {
  // Delete reference from state for deleted ODP
  const { countryIso, year, cycleName, assessmentName } = action.payload

  const odpReference = RecordAssessmentDatas.getTableData({
    data: state.tableData,
    assessmentName,
    cycleName,
    countryIso,
    tableName: TableNames.originalDataPointValue,
  })[year]

  if (odpReference) {
    delete state.tableData[assessmentName][cycleName][countryIso][TableNames.originalDataPointValue][year]
  }
}
