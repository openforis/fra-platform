import { Draft, PayloadAction } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { AssessmentName, Col, CycleName, NodeValueValidation, NodeValueValidations, Row, Table } from 'meta/assessment'

import { DataState } from 'client/store/data/stateType'

type Payload = {
  assessmentName: AssessmentName
  cycleName: CycleName
  countryIso: CountryIso
  table: Table
  row: Row
  col: Col
  nodeValueValidation: NodeValueValidation
}

export const setNodeValueValidation = (state: Draft<DataState>, action: PayloadAction<Payload>) => {
  const { assessmentName, cycleName, countryIso, table, row, col, nodeValueValidation } = action.payload
  const tableName = table.props.name
  const { colName } = col.props
  const { variableName } = row.props

  const currentValidation = state.nodeValueValidations[assessmentName]?.[cycleName]?.[countryIso]?.[tableName]?.[
    colName
  ]?.[variableName] ?? { valid: true }

  if (!NodeValueValidations.equals(currentValidation, nodeValueValidation)) {
    const path = ['nodeValueValidations', assessmentName, cycleName, countryIso, tableName, colName, variableName]
    Objects.setInPath({ obj: state, path, value: nodeValueValidation })
  }
}
