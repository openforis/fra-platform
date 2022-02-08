import React, { useRef } from 'react'
import { NodeValue, Table as TableMetaData } from '@meta/assessment'
import { useTranslation } from 'react-i18next'
//
// import { AssessmentType, TableData, TableDatumODP } from '@core/assessment'
// import { RowSpec, TableSpec, TypeSpec } from '@webapp/sectionSpec'
// import { useI18n } from '@webapp/hooks'
// import { usePrintView } from '@webapp/store/app'
//
// import ButtonTableExport from '@webapp/components/ButtonTableExport'
// import CellOdpHeader from './CellOdpHeader'
// import Row from './Row'
//
// type Props = {
//   assessmentType: AssessmentType
//   sectionName: string
//   sectionAnchor: string
//   tableSpec: TableSpec
//   rows: Array<RowSpec>
//   data: TableData
//   disabled: boolean
// }
type Props = {
  metaData: TableMetaData
  data: Record<string, NodeValue>
  index: number
}

const Table: React.FC<Props> = (props) => {
  // const { assessmentType, sectionName, sectionAnchor, tableSpec, rows, data, disabled } = props
  const { data, metaData, index } = props

  const { i18n } = useTranslation()
  // const [printView] = usePrintView()
  //
  const { odp, name } = metaData.props
  const secondary = index > 0
  // const rowsHeader = rows.filter((row) => row.type === TypeSpec.header)
  // const rowsData = rows.filter((row) => row.type !== TypeSpec.header)
  const tableRef = useRef<HTMLTableElement>(null)
  // const displayTableExportButton = !secondary && !printView && tableRef.current != null
  //
  return (
    <div className={`fra-table__container${secondary ? ' fra-secondary-table__wrapper' : ''}`}>
      <div className="fra-table__scroll-wrapper">
        {/* {displayTableExportButton && <ButtonTableExport tableRef={tableRef} filename={sectionAnchor} />} */}

        <table id={name} ref={tableRef} className="fra-table data-table">
          <thead>
            {/* {rowsHeader.map((row) => ( */}
            {/*  <tr key={row.idx}> */}
            {/*    {row.cols.map((col) => { */}
            {/*      const { idx, className, colSpan, rowSpan, labelKey, labelParams, label } = col */}
            {/*      return ( */}
            {/*        <th */}
            {/*          key={idx} */}
            {/*          className={className} */}
            {/*          colSpan={odp && !colSpan ? data.length : colSpan} */}
            {/*          rowSpan={rowSpan} */}
            {/*        > */}
            {/*          {labelKey ? i18n.t(labelKey, labelParams) : label} */}
            {/*        </th> */}
            {/*      ) */}
            {/*    })} */}
            {/*  </tr> */}
            {/* ))} */}

            {odp && (
              <tr>
                {/* {data.map((datum) => { */}
                {/*  // const datumODP = datum as TableDatumODP */}
                {/*  return ( */}
                {/*    <span>OdpHeader</span> */}
                {/*    // <CellOdpHeader key={datumODP.name || datumODP.year} sectionName={sectionName} datum={datumODP} /> */}
                {/*  ) */}
                {/* })} */}
              </tr>
            )}
          </thead>

          <tbody>
            {/* {rowsData.map((row) => ( */}
            {/*  <Row */}
            {/*    key={row.idx} */}
            {/*    assessmentType={assessmentType} */}
            {/*    sectionName={sectionName} */}
            {/*    tableSpec={tableSpec} */}
            {/*    data={data} */}
            {/*    row={row} */}
            {/*    disabled={disabled} */}
            {/*  /> */}
            {/* ))} */}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Table
