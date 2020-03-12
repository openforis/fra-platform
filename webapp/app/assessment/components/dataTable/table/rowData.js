import React from 'react'
import PropTypes from 'prop-types'

import * as BasePaths from '@webapp/main/basePaths'

import { Link } from 'react-router-dom'
import Cell from '@webapp/app/assessment/components/dataTable/table/cell'
import ReviewIndicator from '@webapp/app/assessment/components/review/reviewIndicator'
import useI18n from '@webapp/components/hooks/useI18n'
import useCountryIso from '@webapp/components/hooks/useCountryIso'
import useRowClassName from '@webapp/app/assessment/components/dataTable/table/useRowClassName'
import CellOdp from '@webapp/app/assessment/components/dataTable/table/cell/cellOdp'

const RowData = props => {
  const countryIso = useCountryIso()
  const i18n = useI18n()

  const { data, assessmentType, sectionName, tableName, odp, row, disabled } = props

  const { idx: rowIdx, cols, validator, variableName } = row

  const colHeader = cols.find(col => col.type === 'header')
  const colHeaderLabel = i18n.t(colHeader.labelKey)
  const colsData = cols.filter(col => col.type !== 'header')

  const reviewTarget = [tableName, 'row', `${rowIdx}`]
  const className = useRowClassName(reviewTarget)

  const colHeaderValue = `${colHeaderLabel}${colHeader.variableNo ? ` (${colHeader.variableNo})` : ''}`
  return (
    <tr className={className}>
      <th className={colHeader.className}>
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
        ? data.map((datum, i) => (
            <CellOdp
              key={datum.name}
              disabled={disabled}
              data={data}
              datum={datum}
              sectionName={sectionName}
              validator={validator}
              variableName={variableName}
              rowIdx={rowIdx}
              colIdx={i}
            />
          ))
        : colsData.map(col => (
            <Cell
              key={col.idx}
              data={data}
              assessmentType={assessmentType}
              sectionName={sectionName}
              tableName={tableName}
              disabled={disabled}
              rowIdx={rowIdx}
              col={col}
            />
          ))}

      <td className="fra-table__row-anchor-cell">
        <div className="fra-table__review-indicator-anchor">
          {!disabled && (
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

RowData.propTypes = {
  data: PropTypes.array.isRequired,
  assessmentType: PropTypes.string.isRequired,
  sectionName: PropTypes.string.isRequired,
  tableName: PropTypes.string.isRequired,
  odp: PropTypes.bool.isRequired,
  row: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
}

export default RowData
