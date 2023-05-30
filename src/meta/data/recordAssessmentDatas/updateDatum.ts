import { NodeValue } from '@meta/assessment'

import { RecordAssessmentData } from '../RecordAssessmentData'
import { Props } from './props'

export const updateDatum = (
  props: Props & {
    value: NodeValue
  }
): RecordAssessmentData => {
  const { assessmentName, cycleName, data, countryIso, tableName, variableName, colName, value } = props
  const dataClone = { ...data }
  if (!dataClone[assessmentName]) dataClone[assessmentName] = {}
  if (!dataClone[assessmentName][cycleName]) dataClone[assessmentName][cycleName] = {}
  if (!dataClone[assessmentName][cycleName][countryIso]) dataClone[assessmentName][cycleName][countryIso] = {}
  if (!dataClone[assessmentName][cycleName][countryIso][tableName])
    dataClone[assessmentName][cycleName][countryIso][tableName] = {}
  if (!dataClone[assessmentName][cycleName][countryIso][tableName][colName])
    dataClone[assessmentName][cycleName][countryIso][tableName][colName] = {}
  dataClone[assessmentName][cycleName][countryIso][tableName][colName][variableName] = value

  return dataClone
}
