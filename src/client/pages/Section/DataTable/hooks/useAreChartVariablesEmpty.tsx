import { useMemo } from 'react'

import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Table, Tables } from 'meta/assessment'
import { RecordAssessmentData, RecordAssessmentDatas } from 'meta/data'

import { useCycle } from 'client/store/assessment'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

type Props = {
  table: Table
  data: RecordAssessmentData
}

export const useAreChartVariablesEmpty = (props: Props) => {
  const { table, data } = props
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()
  const cycle = useCycle()

  return useMemo(() => {
    const { name: tableName } = table.props
    const baseProps = { assessmentName, cycleName, countryIso, tableName, data }
    const chartRows = Tables.getChartRows({ table, cycle })

    if (Objects.isEmpty(chartRows)) {
      return true
    }

    const variableNames = chartRows.map((row) => row.props.variableName)

    return variableNames.every((variableName) =>
      RecordAssessmentDatas.isVariableDataEmpty({ ...baseProps, variableName })
    )
  }, [assessmentName, countryIso, cycle, cycleName, data, table])
}
