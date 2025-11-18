import { useMemo } from 'react'

import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName } from 'meta/assessment/assessment'
import { ColName } from 'meta/assessment/col'
import { CycleName } from 'meta/assessment/cycle'
import { NodeValue } from 'meta/assessment/node'
import { TableName } from 'meta/assessment/table'
import { VariableName } from 'meta/assessment/variable'
import { RecordAssessmentData } from 'meta/data/recordData'
import { RecordAssessmentDatas } from 'meta/data/recordDatas'

import { HistorySelectors } from 'client/store/data/history/selectors'
import { useAppSelector } from 'client/store/hooks'
import { useCountryRouteParams } from 'client/hooks/routeParams'

type PropsNodeValue = {
  assessmentName: AssessmentName
  cycleName: CycleName
  countryIso: CountryIso
  tableName: TableName
  colName: ColName
  variableName: VariableName
}

export const useLastApprovedHistoryTableData = (): RecordAssessmentData => {
  return useAppSelector((state) => HistorySelectors.getLastApprovedTableData(state))
}

export const useLastApprovedHistoryNodeValue = (props: PropsNodeValue): NodeValue => {
  const { assessmentName, colName, countryIso, cycleName, tableName, variableName } = props
  const data = useLastApprovedHistoryTableData()

  return useMemo<NodeValue>(() => {
    const nodeValueProps = { assessmentName, cycleName, countryIso, tableName, colName, variableName, data }
    return RecordAssessmentDatas.getNodeValue(nodeValueProps) ?? ({} as NodeValue)
  }, [assessmentName, colName, countryIso, cycleName, data, tableName, variableName])
}

export const useHistoryLastApprovedDataTableFetched = (tableName: TableName): boolean => {
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()
  const data = useLastApprovedHistoryTableData()

  return useMemo<boolean>(() => {
    const path = [assessmentName, cycleName, countryIso, tableName]
    return !Objects.isNil(Objects.getInPath(data, path))
  }, [assessmentName, countryIso, cycleName, data, tableName])
}
