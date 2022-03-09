import { createAction } from '@reduxjs/toolkit'
import { AssessmentName, NodeValue } from '@meta/assessment'
import { CountryIso } from '@meta/area'

export type ParamsSetNodeValue = {
  assessmentName: AssessmentName
  countryIso: CountryIso
  colName: string
  cycleName: string
  sectionName: string
  tableName: string
  variableName: string
  value: NodeValue
}

export const setNodeValue = createAction<ParamsSetNodeValue>('section/nodeValue/set')
