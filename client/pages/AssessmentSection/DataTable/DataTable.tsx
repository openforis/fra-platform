import './DataTable.scss'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { AssessmentName, Table as TableType } from '@meta/assessment'

import { useAppDispatch } from '@client/store'
import { useCycle } from '@client/store/assessment'
import { AssessmentSectionActions, useTableData } from '@client/store/pages/assessmentSection'
import { useCountryIso } from '@client/hooks'
import GenerateValues from '@client/pages/AssessmentSection/DataTable/GenerateValues'

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
  const { i18n } = useTranslation()
  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()
  const data = useTableData({ table })
  const cycle = useCycle()
  // Data of current section, passed for table

  const {
    // props: { name: tableName },
    rows,
    props: { odp },
    // isSectionDataEmpty,
    // odp,
    // showOdpChart,
    // canGenerateValues,
    // print,
  } = table
  // const breakPointsColsPrint = print.colBreakPoints

  // const i18n = useI18n()
  // const data = [] // useSelector(getTableData(assessmentName, sectionName, tableName))
  // const dataEmpty: boolean = useSelector(isSectionDataEmpty(assessmentName, sectionName, tableName))
  // const generateValues: boolean = useSelector(
  //   (state) => odp && !disabled && Objects.isFunction(canGenerateValues) && canGenerateValues(state)
  // )
  // const [printView] = usePrintView()

  // if (!data) {
  //   return null
  // }

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
    return () => {
      dispatch(AssessmentSectionActions.resetData())
    }
  }, [sectionName])

  if (!data?.[countryIso]) return null

  const showOdpChart = table.props.odp
  const printView = false
  const dataEmpty = false

  // TODO: Fix showing generateValues
  const generateValues = table.props.odp

  return (
    <>
      {showOdpChart && (!printView || !dataEmpty) && (
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

      {/* {printView && breakPointsColsPrint?.length > 0 ? ( */}
      {/*  breakPointsColsPrint.map((breakPoint, idx) => { */}
      {/*    const rowsSliced = getRowsSliced(breakPointsColsPrint, idx, rows) */}
      {/*    return ( */}
      {/*      <Table */}
      {/*        key={breakPoint} */}
      {/*        assessmentName={assessmentName} */}
      {/*        sectionName={sectionName} */}
      {/*        sectionAnchor={sectionAnchor} */}
      {/*        table={table} */}
      {/*        rows={rowsSliced} */}
      {/*        data={data} */}
      {/*        disabled={disabled} */}
      {/*      /> */}
      {/*    ) */}
      {/*  }) */}
      {/* ) : ( */}
      <Table
        assessmentName={assessmentName}
        sectionName={sectionName}
        sectionAnchor={sectionAnchor}
        table={table}
        rows={rows}
        data={data}
        disabled={disabled}
      />
      {/* )} */}
    </>
  )
}

export default DataTable
