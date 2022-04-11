import React, { useRef } from 'react'

import { AssessmentName, Col, Row as TypeRow, RowType, Table as TableType } from '@meta/assessment'

import ButtonTableExport from '@client/components/ButtonTableExport'
// import CellOdpHeader from './CellOdpHeader'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { useCountryIso } from '@client/hooks'
import { TableData } from '@meta/data'
import * as DataTableUtils from '@client/pages/AssessmentSection/DataTable/utils'
import { useOriginalDataPointYears, useShowOriginalDatapoints } from '@client/store/pages/assessmentSection/hooks'
import { BasePaths } from '@client/basePaths'
import { useCycle, useAssessmentCountry } from '@client/store/assessment'
import Row from './Row'

type Props = {
  assessmentName: AssessmentName
  sectionName: string
  sectionAnchor: string
  table: TableType
  rows: Array<TypeRow>
  data: TableData
  disabled: boolean
}

const Table: React.FC<Props> = (props) => {
  const { assessmentName, sectionName, sectionAnchor, table, rows, data, disabled } = props
  const showOriginalDatapoints = useShowOriginalDatapoints()

  const cycle = useCycle()
  const { i18n } = useTranslation()
  const odpYears = useOriginalDataPointYears()

  const [printView] = [false] // usePrintView()

  const countryIso = useCountryIso()
  const odp = table.props.odp === true
  const secondary = false // todo: missing table.props.secondary === true
  const rowsHeader = rows.filter((row) => row.props.type === RowType.header)
  const rowsData = rows.filter((row) => row.props.type !== RowType.header)
  const tableRef = useRef<HTMLTableElement>(null)
  const displayTableExportButton = !secondary && !printView && tableRef.current != null
  const country = useAssessmentCountry()

  // Get headers from data
  const headers = DataTableUtils.getHeaders(data, countryIso, table)
  return (
    <div className={`fra-table__container${secondary ? ' fra-secondary-table__wrapper' : ''}`}>
      <div className="fra-table__scroll-wrapper">
        {displayTableExportButton && <ButtonTableExport tableRef={tableRef} filename={sectionAnchor} />}

        <table id={table.props.name} ref={tableRef} className="fra-table data-table">
          <thead>
            {rowsHeader.map((row: TypeRow, rowIndex: number) => (
              <tr key={row.uuid}>
                {row.cols.map((col: Col, colIndex: number) => {
                  const { index, /* idx, className, */ colSpan, rowSpan, labelKey /* labelParams,  label */ } =
                    col.props
                  const columnName = headers[colIndex]

                  let isOdpHeader = showOriginalDatapoints && table.props.odp && odpYears?.includes(columnName)

                  if (table.props.name === 'forestCharacteristics')
                    isOdpHeader = isOdpHeader && country.props.forestCharacteristics.useOriginalDataPoint

                  const getColumnName = () => {
                    if (labelKey)
                      return i18n.t(labelKey, {
                        /* labelParams */
                      })

                    if (isOdpHeader) {
                      return (
                        <Link
                          className="link"
                          to={BasePaths.Assessment.OriginalDataPoint.section(
                            countryIso,
                            assessmentName,
                            cycle.name,
                            columnName,
                            table.props.name
                          )}
                        >
                          {columnName}
                        </Link>
                      )
                    }
                    return columnName
                  }

                  let className = `fra-table__header-cell${index === 0 && rowIndex === 0 ? '-left' : ''}`
                  if (isOdpHeader && rowIndex > 0) {
                    className = 'odp-header-cell'
                  }

                  return (
                    <th
                      key={col.uuid}
                      className={className}
                      colSpan={odp && !colSpan ? DataTableUtils.getODPColSpan({ table, data }) : colSpan}
                      rowSpan={rowSpan}
                    >
                      {getColumnName()}
                    </th>
                  )
                })}
              </tr>
            ))}

            {/* TODO */}
            {/* {odp && ( */}
            {/*  <tr> */}
            {/*    {data.map((datum) => { */}
            {/*      const datumODP = datum as TableDatumODP */}
            {/*      return ( */}
            {/*        <CellOdpHeader key={datumODP.name || datumODP.year} sectionName={sectionName} datum={datumODP} /> */}
            {/*      ) */}
            {/*    })} */}
            {/*  </tr> */}
            {/* )} */}
          </thead>

          <tbody>
            {rowsData.map((row: TypeRow) => {
              return (
                <Row
                  key={row.uuid}
                  assessmentName={assessmentName}
                  sectionName={sectionName}
                  table={table}
                  data={data}
                  row={row}
                  disabled={disabled}
                />
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Table
