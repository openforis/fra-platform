import React from 'react'
import { Link } from 'react-router-dom'

import { TableDatumODP } from '@core/assessment'
import * as BasePaths from '@webapp/main/basePaths'
import { useCountryIso, useI18n } from '@webapp/hooks'

import ReviewIndicator from '@webapp/app/assessment/components/review/reviewIndicator'
import { Props } from '../props'
import useClassName from './useClassName'
import Cell from './Cell'
import CellOdp from './CellOdp'

const RowData: React.FC<Props> = (props) => {
  const { data, assessmentType, sectionName, tableSpec, row, disabled } = props

  const countryIso = useCountryIso()
  const i18n = useI18n()

  const { name: tableName, odp, secondary } = tableSpec
  const { idx: rowIdx, cols, variableName } = row
  const colHeader = cols[0]
  const colHeaderLabel = colHeader.label ? colHeader.label : i18n.t(colHeader.labelKey, colHeader.labelParams)
  const colsData = cols.slice(1, cols.length)
  const reviewTarget = [tableName, 'row', `${rowIdx}`]
  const className = useClassName(reviewTarget)
  const colHeaderValue = `${colHeaderLabel}${colHeader.variableNo ? ` (${colHeader.variableNo})` : ''}`

  return (
    <tr className={className}>
      <th className={colHeader.className} colSpan={colHeader.colSpan} rowSpan={colHeader.rowSpan}>
        {colHeader.linkToSection ? (
          <>
            <div className="only-print">{colHeaderValue}</div>
            <Link
              to={BasePaths.getAssessmentSectionLink(countryIso, assessmentType, colHeader.linkToSection)}
              className="link no-print"
            >
              {colHeaderValue}
            </Link>
          </>
        ) : (
          colHeaderValue
        )}
      </th>

      {odp
        ? data.map((datum: TableDatumODP) => (
            <CellOdp
              key={datum.name || datum.year}
              assessmentType={assessmentType}
              sectionName={sectionName}
              tableSpec={tableSpec}
              rowSpec={row}
              variableName={variableName as keyof TableDatumODP}
              disabled={disabled}
              data={data}
              datum={datum}
            />
          ))
        : colsData.map((col) => (
            <Cell
              key={col.idx}
              data={data}
              assessmentType={assessmentType}
              sectionName={sectionName}
              tableSpec={tableSpec}
              disabled={disabled}
              rowIdx={rowIdx as number}
              col={col}
            />
          ))}

      <td className="fra-table__row-anchor-cell">
        <div className="fra-table__review-indicator-anchor">
          {!disabled && !secondary && (
            <ReviewIndicator
              section={sectionName}
              title={colHeaderLabel}
              target={reviewTarget}
              countryIso={countryIso}
            />
          )}
        </div>
      </td>
    </tr>
  )
}

export default RowData
