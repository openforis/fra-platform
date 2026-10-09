import './DataTable.scss'
import React from 'react'

import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName } from 'meta/assessment/assessment'
import { Table as TableType } from 'meta/assessment/table'
import { RecordAssessmentDatas } from 'meta/data/recordDatas'

import { useCycle } from 'client/store/meta/hooks/cycles'
import { useIsEditTableDataEnabled } from 'client/store/user/hooks/auth'
import { useCountryRouteParams } from 'client/hooks/routeParams'
import { useIsPrintRoute } from 'client/hooks/routes'

import { useAreChartVariablesEmpty } from './hooks/useAreChartVariablesEmpty'
import { useData } from './hooks/useData'
import { useODPDeleteListener } from './hooks/useODPDeleteListener'
import Chart from './Chart'
import GenerateValues from './GenerateValues'
import Table from './Table'

type Props = {
  assessmentName: AssessmentName
  sectionName: string
  sectionAnchor: string
  table: TableType
  disabled: boolean
}

const DataTable: React.FC<Props> = (props) => {
  const { assessmentName, disabled, sectionAnchor, sectionName, table } = props

  const cycle = useCycle()
  const { countryIso } = useCountryRouteParams<CountryIso>()
  const data = useData({ table })
  const canEdit = useIsEditTableDataEnabled(sectionName)
  const { onlyTables, print } = useIsPrintRoute()
  useODPDeleteListener()

  const { name: cycleName } = cycle
  const { props: tableProps, rows } = table
  const { name: tableName, odp, secondary } = tableProps

  const dataEmpty = RecordAssessmentDatas.isTableDataEmpty({ assessmentName, cycleName, data, tableName, countryIso })
  const areChartVariablesEmpty = useAreChartVariablesEmpty({ data, table })
  const showOdpChart = odp
  const generateValues = canEdit && odp

  // Always show secondary tables - unless whole section empty (handled in parent)
  if (dataEmpty && onlyTables && !secondary) {
    return null
  }

  // Show chart in print only if chart variables are not empty
  // By default, show chart always
  const showChart = (showOdpChart && print && !areChartVariablesEmpty) || (showOdpChart && !print)

  return (
    <>
      {showChart && <Chart data={data} table={table} />}

      {generateValues && (
        <GenerateValues
          assessmentName={assessmentName}
          cycleName={cycleName}
          data={data}
          rows={rows}
          sectionName={sectionName}
          tableName={tableName}
        />
      )}

      <Table
        assessmentName={assessmentName}
        data={data}
        disabled={disabled}
        sectionAnchor={sectionAnchor}
        sectionName={sectionName}
        table={table}
      />
    </>
  )
}

export default DataTable
