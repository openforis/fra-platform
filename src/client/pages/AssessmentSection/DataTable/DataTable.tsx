import './DataTable.scss'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { AssessmentName, Table as TableType } from '@meta/assessment'
import { TableDatas } from '@meta/data'

import { useAppDispatch } from '@client/store'
import { useCycle } from '@client/store/assessment'
import { AssessmentSectionActions, useTableData } from '@client/store/pages/assessmentSection'
import { useCanEditTableData } from '@client/store/user'
import { useCountryIso } from '@client/hooks'
import { useIsPrint } from '@client/hooks/useIsPath'
import GenerateValues from '@client/pages/AssessmentSection/DataTable/GenerateValues'
import { useODPDeleteListener } from '@client/pages/AssessmentSection/DataTable/useODPDeleteListener'

import Chart from './Chart'
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

  const { i18n } = useTranslation()
  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()
  const data = useTableData({ table })
  const cycle = useCycle()
  const canEditTableData = useCanEditTableData(sectionName)
  const generateValues = canEditTableData && table.props.odp

  const {
    // props: { name: tableName },
    rows,
    props: { odp },
    // isSectionDataEmpty,
    // showOdpChart,
    // canGenerateValues,
    // print,
  } = table
  // const breakPointsColsPrint = print.colBreakPoints

  // const generateValues: boolean = useSelector(
  //   (state) => odp && !disabled && Objects.isFunction(canGenerateValues) && canGenerateValues(state)
  // )

  useODPDeleteListener({ assessmentName, cycleName: cycle.name, countryIso })

  useEffect(() => {
    dispatch(
      AssessmentSectionActions.getTableData({
        assessmentName,
        countryIso,
        cycleName: cycle.name,
        tableNames: [table.props.name],
      })
    )
    if (odp) {
      dispatch(
        AssessmentSectionActions.getOriginalDataPointData({
          assessmentName,
          countryIso,
          cycleName: cycle.name,
        })
      )
    }
  }, [assessmentName, countryIso, cycle.name, dispatch, odp, sectionName, table.props.name])
  if (!data) return null

  const showOdpChart = table.props.odp

  const dataEmpty = TableDatas.isTableDataEmpty({
    data,
    tableName: table.props.name,
    countryIso,
  })

  // Always show secondary tables - unless whole section empty (handled in parent)
  if (dataEmpty && onlyTables && !table.props.secondary) {
    return null
  }

  return (
    <>
      {showOdpChart && (!print || !dataEmpty) && (
        <>
          <Chart
            data={data}
            trends={rows
              .filter((row) => !!row.props.chart)
              .map((row) => ({
                name: row.props.variableName,
                label: i18n.t(row.props.chart.labelKey),
                color: row.props.chart.color,
              }))}
          />
          <div className="page-break" />
        </>
      )}

      {generateValues && (
        <GenerateValues
          assessmentName={assessmentName}
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
