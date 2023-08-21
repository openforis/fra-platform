import './DataTable.scss'
import React from 'react'

import { AssessmentName, Table as TableType } from 'meta/assessment'
import { RecordAssessmentDatas } from 'meta/data'

import { useCycle } from 'client/store/assessment'
import { useIsEditTableDataEnabled } from 'client/store/user'
import { useCountryIso } from 'client/hooks'
import { useIsPrintRoute } from 'client/hooks/useIsRoute'
import { useValidate } from 'client/pages/Section/DataTable/hooks/useValidate'

import { useData } from './hooks/useData'
import { useGetData } from './hooks/useGetData'
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
  const { assessmentName, sectionName, sectionAnchor, table, disabled } = props

  const cycle = useCycle()
  const countryIso = useCountryIso()
  const data = useData({ table })
  const canEdit = useIsEditTableDataEnabled(sectionName)
  const { print, onlyTables } = useIsPrintRoute()
  useGetData({ sectionName, table })
  useValidate({ data, sectionName, table })
  useODPDeleteListener()

  const { name: cycleName } = cycle
  const { props: tableProps, rows } = table
  const { name: tableName, odp, secondary } = tableProps
  const dataEmpty = RecordAssessmentDatas.isTableDataEmpty({ assessmentName, cycleName, data, tableName, countryIso })
  const showOdpChart = odp
  const generateValues = canEdit && odp

  // Always show secondary tables - unless whole section empty (handled in parent)
  if (dataEmpty && onlyTables && !secondary) {
    return null
  }

  return (
    <>
      {showOdpChart && (!print || !dataEmpty) && (
        <>
          <Chart data={data?.[assessmentName]?.[cycleName]} table={table} />
          <div className="page-break" />
        </>
      )}

      {generateValues && (
        <GenerateValues
          assessmentName={assessmentName}
          cycleName={cycleName}
          sectionName={sectionName}
          tableName={tableName}
          rows={rows}
          data={data}
        />
      )}

      <Table
        assessmentName={assessmentName}
        sectionName={sectionName}
        sectionAnchor={sectionAnchor}
        table={table}
        data={data}
        disabled={disabled}
      />
    </>
  )
}

export default DataTable
