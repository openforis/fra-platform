import React from 'react'
import PropTypes from 'prop-types'

import { getSectionLink } from '@common/assessment/sections'

import { Link } from 'react-router-dom'
import Cell from '@webapp/app/assessment/components/dataTable/table/cell'
import ReviewIndicator from '@webapp/app/assessment/components/review/reviewIndicator'
import useI18n from '@webapp/components/hooks/useI18n'
import useCountryIso from '@webapp/components/hooks/useCountryIso'
import useRowClassName from '@webapp/app/assessment/components/dataTable/table/useRowClassName'

const RowData = props => {
  const countryIso = useCountryIso()
  const i18n = useI18n()

  const { data, assessmentType, sectionName, tableName, row, rowIdx, disabled } = props

  const { cols } = row

  const colHeader = cols.find(col => col.type === 'header')
  const colHeaderLabel = i18n.t(colHeader.labelKey)
  const colsData = cols.filter(col => col.type !== 'header')

  const reviewTarget = [tableName, 'row', `${rowIdx}`]
  const className = useRowClassName(reviewTarget)

  const colHeaderValue = `${colHeaderLabel}${colHeader.variableNo ? ` $(colHeader.variableNo})` : ''}`
  return (
    <tr className={className}>
      <th className={colHeader.className}>
        {colHeader.linkToSection ? (
          <>
            <div className="only-print">{colHeaderValue}</div>
            <Link to={getSectionLink(countryIso, assessmentType, colHeader.linkToSection)} className="link no-print">
              {colHeaderValue}
            </Link>
          </>
        ) : (
          colHeaderValue
        )}
      </th>

      {colsData.map(col => (
        <Cell
          key={col.idx}
          data={data}
          assessmentType={assessmentType}
          sectionName={sectionName}
          tableName={tableName}
          disabled={disabled}
          rowIdx={rowIdx}
          colIdx={col.idx}
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
  row: PropTypes.object.isRequired,
  rowIdx: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
}

export default RowData
