import './DataTable.scss'
import React from 'react'

import { CountryIso } from 'meta/area'
import { AssessmentName, Table as TableType } from 'meta/assessment'
import { RecordAssessmentDatas } from 'meta/data'

import { useCycle } from 'client/store/assessment'
import { useIsEditTableDataEnabled } from 'client/store/user'
import { useIsPrintRoute } from 'client/hooks/useIsRoute'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

import { useAreChartVariablesEmpty } from './hooks/useAreChartVariablesEmpty'
import { useData } from './hooks/useData'
import { useODPDeleteListener } from './hooks/useODPDeleteListener'
import { useValidate } from './hooks/useValidate'
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
  const { assessmentName, sectionName, sectionAnchor, table, disabled } = props

  const cycle = useCycle()
  const { countryIso } = useCountryRouteParams<CountryIso>()
  const data = useData({ table })
  const canEdit = useIsEditTableDataEnabled(sectionName)
  const { print, onlyTables } = useIsPrintRoute()
  useValidate({ data, sectionName, table })
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
      {showChart && <Chart data={data?.[assessmentName]?.[cycleName]} table={table} />}

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
