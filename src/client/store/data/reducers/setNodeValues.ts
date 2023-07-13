import { Draft, PayloadAction } from '@reduxjs/toolkit'

import { NodeUpdates, RecordAssessmentDatas } from 'meta/data'

import { DataState } from 'client/store/data/stateType'

type Payload = { nodeUpdates: NodeUpdates }

export const setNodeValues = (state: Draft<DataState>, action: PayloadAction<Payload>) => {
  const { nodeUpdates } = action.payload
  const { countryIso, nodes, assessment, cycle } = nodeUpdates

  nodes.forEach(({ tableName, variableName, colName, value }) => {
    state.tableData = RecordAssessmentDatas.updateDatum({
      assessmentName: assessment.props.name,
      cycleName: cycle.name,
      data: state.tableData,
      countryIso,
      tableName,
      variableName,
      colName,
      value,
    })
  })
}
