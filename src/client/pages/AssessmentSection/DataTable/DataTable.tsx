import './DataTable.scss'
import React from 'react'

import { AssessmentName, Table as TableType } from 'meta/assessment'
import { RecordAssessmentDatas } from 'meta/data'

import { useCycle } from 'client/store/assessment'
import { useTableData } from 'client/store/data'
import { useIsEditTableDataEnabled } from 'client/store/user'
import { useCountryIso } from 'client/hooks'
import { useIsPrint } from 'client/hooks/useIsPath'

import { useGetTableData } from './hooks/useGetTableData'
import { useODPDeleteListener } from './hooks/useODPDeleteListener'
import { useValidateNodes } from './hooks/useValidateNodes'
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
  const { print, onlyTables } = useIsPrint()

  const countryIso = useCountryIso()
  const data = useTableData({ table })
  const cycle = useCycle()
  const canEdit = useIsEditTableDataEnabled(sectionName)

  const { name: cycleName } = cycle
  const { props: tableProps, rows } = table
  const { name: tableName, odp, secondary } = tableProps
  const generateValues = canEdit && odp
  const showOdpChart = odp
  const dataEmpty = RecordAssessmentDatas.isTableDataEmpty({ assessmentName, cycleName, data, tableName, countryIso })

  useGetTableData({ assessmentName, countryIso, cycleName, sectionName, table })
  useODPDeleteListener({ assessmentName, countryIso, cycleName })
  useValidateNodes({ sectionName, table })
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
          tableName={table.props.name}
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
