import { useMemo } from 'react'

import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { ColName, NodeValue, TableName, VariableName } from 'meta/assessment'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { RecordAssessmentData, RecordAssessmentDatas } from 'meta/data'

import { useAppSelector } from 'client/store'
import { DataSelector } from 'client/store/data/selectors'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

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

export const useHistoryLastApprovedDataTableFetched = (tableName: TableName): boolean => {
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()
  const data = useLastApprovedHistoryTableData()

  return useMemo<boolean>(() => {
    const path = [assessmentName, cycleName, countryIso, tableName]
    return !Objects.isNil(Objects.getInPath(data, path))
  }, [assessmentName, countryIso, cycleName, data, tableName])
}
