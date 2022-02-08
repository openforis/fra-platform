import './DataTable.scss'
import React from 'react'
import { NodeValue, Table as MetaDataTable } from '@meta/assessment'
import { CountryIso } from '@meta/area'
// import { useSelector } from 'react-redux'
//
// import { AssessmentType, TableData } from '@core/assessment'
// import { Objects } from '@core/utils'
// import { TableSpec } from '@webapp/sectionSpec'
// import { useI18n } from '@webapp/hooks'
// import { usePrintView } from '@webapp/store/app'
//
import Table from './Table'
// import Chart from './Chart'
// import GenerateValues from './GenerateValues'
// import { getRowsSliced } from './printUtils'
//
// type Props = {
//   assessmentType: AssessmentType
//   sectionName: string
//   sectionAnchor: string
//   tableSpec: TableSpec
//   disabled: boolean
// }

type Props = {
  metaData: MetaDataTable
  data: Record<string, NodeValue>
}

const DataTable: React.FC<Props> = (props: Props) => {
  const { metaData, data } = props
  return (
    <Table
      metaData={metaData}
      data={data}
      // assessmentType={assessmentType}
      // sectionName={sectionName}
      // sectionAnchor={sectionAnchor}
      // tableSpec={tableSpec}
      // rows={rows}
      // data={data}
      // disabled={disabled}
    />
  )
  // const { assessmentType, sectionName, sectionAnchor, tableSpec, disabled } = props
  // const {
  //   name: tableName,
  //   rows,
  //   getSectionData,
  //   isSectionDataEmpty,
  //   odp,
  //   showOdpChart,
  //   canGenerateValues,
  //   print,
  // } = tableSpec
  // const breakPointsColsPrint = print.colBreakPoints
  //
  // const i18n = useI18n()
  // const data: TableData = useSelector(getSectionData(assessmentType, sectionName, tableName))
  // const dataEmpty: boolean = useSelector(isSectionDataEmpty(assessmentType, sectionName, tableName))
  // const generateValues: boolean = useSelector(
  //   (state) => odp && !disabled && Objects.isFunction(canGenerateValues) && canGenerateValues(state)
  // )
  // const [printView] = usePrintView()
  //
  // if (!data) {
  //   return null
  // }
  //
  // return (
  //   <>
  //     {showOdpChart && (!printView || !dataEmpty) && (
  //       <>
  //         <Chart
  //           fra={data}
  //           trends={rows
  //             .filter((row) => !!row.chartProps)
  //             .map((row) => ({
  //               name: row.variableName,
  //               label: i18n.t(row.chartProps.labelKey),
  //               color: row.chartProps.color,
  //             }))}
  //         />
  //         <div className="page-break" />
  //       </>
  //     )}
  //
  //     {generateValues && (
  //       <GenerateValues
  //         assessmentType={assessmentType}
  //         sectionName={sectionName}
  //         tableName={tableName}
  //         rows={rows}
  //         data={data}
  //       />
  //     )}
  //
  //     {printView && breakPointsColsPrint?.length > 0 ? (
  //       breakPointsColsPrint.map((breakPoint, idx) => {
  //         const rowsSliced = getRowsSliced(breakPointsColsPrint, idx, rows)
  //         return (
  //           <Table
  //             key={breakPoint}
  //             assessmentType={assessmentType}
  //             sectionName={sectionName}
  //             sectionAnchor={sectionAnchor}
  //             tableSpec={tableSpec}
  //             rows={rowsSliced}
  //             data={data}
  //             disabled={disabled}
  //           />
  //         )
  //       })
  //     ) : (
  //       <Table
  //         assessmentType={assessmentType}
  //         sectionName={sectionName}
  //         sectionAnchor={sectionAnchor}
  //         tableSpec={tableSpec}
  //         rows={rows}
  //         data={data}
  //         disabled={disabled}
  //       />
  //     )}
  //   </>
  // )
}

export default DataTable
