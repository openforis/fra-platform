import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { AssessmentName, Col as TypeCol, Row as TypeRow, RowType, Table as TableType } from '@meta/assessment'
import { TableData } from '@meta/data'

import { useAssessmentCountry, useCycle } from '@client/store/assessment'
import { useOriginalDataPointYears, useShowOriginalDatapoints } from '@client/store/pages/assessmentSection/hooks'
import { useCountryIso } from '@client/hooks'
import { ClientRoutes } from '@client/clientRoutes'
import ButtonTableExport from '@client/components/ButtonTableExport'
import Tooltip from '@client/components/Tooltip'
import * as DataTableUtils from '@client/pages/AssessmentSection/DataTable/utils'

import { parseTable } from './parseTable'
import Row from './Row'

type Props = {
  assessmentName: AssessmentName
  sectionName: string
  sectionAnchor: string
  table: TableType
  data: TableData
  disabled: boolean
}

const Table: React.FC<Props> = (props) => {
  const { assessmentName, sectionName, sectionAnchor, table: tableProps, data, disabled } = props

  const cycle = useCycle()
  const { i18n } = useTranslation()
  const odpYears = useOriginalDataPointYears()
  const showOriginalDatapoints = useShowOriginalDatapoints()

  const country = useAssessmentCountry()
  const countryIso = useCountryIso()
  const [printView] = [false] // usePrintView()
  const tableRef = useRef<HTMLTableElement>(null)

  // Get headers from data
  const headers = DataTableUtils.getHeaders(data, countryIso, tableProps)
  const table = parseTable({ headers, table: tableProps })
  const { odp, secondary } = table.props
  const rowsHeader = table.rows.filter((row) => row.props.type === RowType.header)
  const rowsData = table.rows.filter((row) => row.props.type !== RowType.header)
  const displayTableExportButton = !secondary && !printView && tableRef.current != null

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
                {row.cols.map((col: TypeCol, colIndex: number) => {
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
                            to={ClientRoutes.Assessment.OriginalDataPoint.section.getAbsolutePath({
                              countryIso,
                              assessmentName,
                              cycleName: cycle.name,
                              year: columnName,
                              section: table.props.name,
                            })}
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
