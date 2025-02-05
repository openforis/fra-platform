import { useMemo } from 'react'

import { CountryIso } from 'meta/area'
import { AssessmentName, ColName, CycleName, NodeValue, TableName, VariableName } from 'meta/assessment'
import { RecordAssessmentData, RecordAssessmentDatas } from 'meta/data'

import { useAppSelector } from 'client/store'
import { DataSelector } from 'client/store/data/selectors'

type PropsNodeValue = {
  assessmentName: AssessmentName
  cycleName: CycleName
  countryIso: CountryIso
  tableName: TableName
  colName: ColName
  variableName: VariableName
}
export const useLastApprovedHistoryTableData = (): RecordAssessmentData => {
  return useAppSelector((state) => DataSelector.History.getLastApprovedTableData(state))
}

export const useLastApprovedHistoryNodeValue = (props: PropsNodeValue): NodeValue => {
  const { assessmentName, cycleName, countryIso, tableName, colName, variableName } = props
  const data = useLastApprovedHistoryTableData()

  return useMemo<NodeValue>(() => {
    const nodeValueProps = { assessmentName, cycleName, countryIso, tableName, colName, variableName, data }
    return RecordAssessmentDatas.getNodeValue(nodeValueProps) ?? ({} as NodeValue)
  }, [assessmentName, colName, countryIso, cycleName, data, tableName, variableName])
}
