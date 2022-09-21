import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { AssessmentName, Col as TypeCol, Cols, Row as TypeRow, RowType, Table as TableType } from '@meta/assessment'
import { TableData } from '@meta/data'

import { useAssessmentCountry, useCycle } from '@client/store/assessment'
import { useOriginalDataPointYears, useShowOriginalDatapoints } from '@client/store/pages/assessmentSection/hooks'
import { useCountryIso } from '@client/hooks'
import { useIsPrint } from '@client/hooks/useIsPath'
import { ClientRoutes } from '@client/clientRoutes'
import ButtonTableExport from '@client/components/ButtonTableExport'
import Tooltip from '@client/components/Tooltip'

import { getODPColSpan } from './utils/getODPColSpan'
import { parseTable } from './utils/parseTable'
import DataValidations from './DataValidations'
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
  const showODP = useShowOriginalDatapoints()

  const country = useAssessmentCountry()
  const countryIso = useCountryIso()
  const { print } = useIsPrint()
  const tableRef = useRef<HTMLTableElement>(null)

  const { headers, table } = parseTable({ countryIso, cycle, data, showODP, table: tableProps })
  const { odp, secondary } = table.props
  const rowsHeader = table.rows.filter((row) => row.props.type === RowType.header)
  const rowsData = table.rows.filter((row) => row.props.type !== RowType.header)
  const displayTableExportButton = !secondary && !print && tableRef.current != null

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
                  const { index, label } = col.props
                  const { colSpan, rowSpan } = Cols.getStyle({ cycle, col })
                  const columnName = headers[colIndex]

                  let isOdpHeader = showODP && table.props.odp && odpYears?.includes(columnName)

                  if (table.props.name === 'forestCharacteristics')
                    isOdpHeader = isOdpHeader && country.props.forestCharacteristics.useOriginalDataPoint

                  const getColumnName = () => {
                    if (label?.key) return i18n.t(label?.key, label?.params)
                    if (typeof label?.label === 'string') return label?.label

                    if (isOdpHeader && !print) {
                      return (
                        <Tooltip text={i18n.t('nationalDataPoint.clickOnNDP')}>
                          <Link
                            className="link"
                            to={ClientRoutes.Assessment.OriginalDataPoint.Section.getLink({
                              countryIso,
                              assessmentName,
                              cycleName: cycle.name,
                              year: columnName,
                              sectionName: table.props.name,
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
                  if (isOdpHeader && !print && rowIndex > 0) className = 'odp-header-cell'

                  return (
                    <th
                      key={col.uuid}
                      className={className}
                      colSpan={odp && !colSpan ? getODPColSpan({ headers, table, data }) : colSpan}
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

        <DataValidations table={table} />
      </div>
    </div>
  )
}

export default Table
