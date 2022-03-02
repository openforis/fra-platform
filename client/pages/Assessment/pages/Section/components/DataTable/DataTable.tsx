import './DataTable.scss'
import React, { useEffect } from 'react'

import { AssessmentName, Table as TableType } from '@meta/assessment'
import { AssessmentSectionActions, useAssessmentSection } from '@client/store/pages/assessmentSection'
import { useAppDispatch } from '@client/store'
import { useCountryIso } from '@client/hooks'
// import { useCycle } from '@client/store/assessment'
import { TableData } from '@meta/data'
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
  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()
  // const cycle = useCycle()
  const assessmentSection = useAssessmentSection()
  // Data of current section, passed for table
  const { data = {} as TableData } = assessmentSection
  const {
    // props: { name: tableName },
    rows,
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
    // dispatch(
    //   AssessmentSectionActions.getTableData({
    //     assessmentName,
    //     countryIso,
    //     tableNames: [table.props.name],
    //     cycleName: cycle.name,
    //     section: sectionName,
    //   })
    // )
    return () => {
      dispatch(AssessmentSectionActions.resetData())
    }
  }, [sectionName])

  if (!data?.[countryIso]) return null

  return (
    <>
      {/* {showOdpChart && (!printView || !dataEmpty) && ( */}
      {/*  <> */}
      {/*    <Chart */}
      {/*      fra={data} */}
      {/*      trends={rows */}
      {/*        .filter((row) => !!row.chartProps) */}
      {/*        .map((row) => ({ */}
      {/*          name: row.variableName, */}
      {/*          label: i18n.t(row.chartProps.labelKey), */}
      {/*          color: row.chartProps.color, */}
      {/*        }))} */}
      {/*    /> */}
      {/*    <div className="page-break" /> */}
      {/*  </> */}
      {/* )} */}

      {/* {generateValues && ( */}
      {/*  <GenerateValues */}
      {/*    assessmentName={assessmentName} */}
      {/*    sectionName={sectionName} */}
      {/*    tableName={tableName} */}
      {/*    rows={rows} */}
      {/*    data={data} */}
      {/*  /> */}
      {/* )} */}

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
