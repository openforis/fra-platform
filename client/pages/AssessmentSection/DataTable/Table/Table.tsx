import React, { useRef } from 'react'
// import CellOdpHeader from './CellOdpHeader'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { AssessmentName, Col, Row as TypeRow, RowType, Table as TableType } from '@meta/assessment'
import { TableData } from '@meta/data'

import { useAssessmentCountry, useCycle } from '@client/store/assessment'
import { useOriginalDataPointYears, useShowOriginalDatapoints } from '@client/store/pages/assessmentSection/hooks'
import { useCountryIso } from '@client/hooks'
import { BasePaths } from '@client/basePaths'
import ButtonTableExport from '@client/components/ButtonTableExport'
import Tooltip from '@client/components/Tooltip'
import * as DataTableUtils from '@client/pages/AssessmentSection/DataTable/utils'

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

  const cycle = useCycle()
  const { i18n } = useTranslation()
  const odpYears = useOriginalDataPointYears()
  const showOriginalDatapoints = useShowOriginalDatapoints()

  const [printView] = [false] // usePrintView()

  const countryIso = useCountryIso()
  const { odp, secondary } = table.props
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
        {displayTableExportButton && (
          <ButtonTableExport tableRef={tableRef} filename={sectionAnchor} inReview={!disabled && !secondary} />
        )}

        <table id={table.props.name} ref={tableRef} className="fra-table data-table">
          <thead>
            {rowsHeader.map((row: TypeRow, rowIndex: number) => (
              <tr key={row.uuid}>
                {row.cols.map((col: Col, colIndex: number) => {
                  const { index, /* idx, className, */ colSpan, rowSpan, label /* labelParams,  label */ } = col.props
                  const columnName = headers[colIndex]

                  let isOdpHeader = showOriginalDatapoints && table.props.odp && odpYears?.includes(columnName)

                  if (table.props.name === 'forestCharacteristics')
                    isOdpHeader = isOdpHeader && country.props.forestCharacteristics.useOriginalDataPoint

                  const getColumnName = () => {
                    if (label?.key) return i18n.t(label?.key, label?.params)
                    if (typeof label?.label === 'string') return label?.label

                    if (isOdpHeader) {
                      return (
                        <Tooltip text={i18n.t('nationalDataPoint.clickOnNDP')}>
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
                        </Tooltip>
                      )
                    }
                    return columnName
                  }

                  const headerLeft = (index === 0 && rowIndex === 0) || row.props?.readonly
                  let className = `fra-table__header-cell${headerLeft ? '-left' : ''}`
                  if (isOdpHeader && rowIndex > 0) className = 'odp-header-cell'

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
