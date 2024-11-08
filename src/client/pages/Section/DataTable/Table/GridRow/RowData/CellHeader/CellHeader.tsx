import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import classNames from 'classnames'

import { AssessmentName, Col, Cols, Row } from 'meta/assessment'
import { Routes } from 'meta/routes'

import { useCycle } from 'client/store/assessment'
import { useCountryIso } from 'client/hooks'
import { DataCell } from 'client/components/DataGrid'

const CellHeader: React.FC<{ assessmentName: AssessmentName; col: Col; row: Row }> = (props) => {
  const { assessmentName, col, row } = props

  const { t } = useTranslation()
  const cycle = useCycle()
  const countryIso = useCountryIso()

  let colHeaderLabel = Cols.getLabel({ cycle, col, t })
  const variableNo = col.props.variableNo?.[cycle.uuid]
  if (variableNo) colHeaderLabel = `${colHeaderLabel} (${variableNo})`
  const { colSpan, gridColumn, gridRow, rowSpan, ...colHeaderStyle } = Cols.getStyle({ col, cycle })
  const classes = Cols.getClassNames({ col, cycle })

  // TODO: revisit the concept of headerCell
  const headerCell = row.cols.every((col) => Cols.isReadOnly({ cycle, row, col }))
  const subcategory = row.props.categoryLevel > 0

  return (
    <DataCell
      className={classNames(
        {
          // [`fra-table__subcategory${row.props.categoryLevel}-cell`]: subcategory,
          // 'fra-table__category-cell': !subcategory && !headerCell,
          // 'fra-table__header-cell-left': !subcategory && headerCell,
        },
        classes
      )}
      gridColumn={gridColumn}
      gridRow={gridRow}
      // colSpan={colSpan}
      // rowSpan={rowSpan}
      style={colHeaderStyle}
    >
      {row.props.linkToSection?.[cycle.uuid] ? (
        <>
          <div className="only-print">{colHeaderLabel}</div>
          <Link
            className="link no-print"
            to={Routes.Section.generatePath({
              countryIso,
              assessmentName,
              cycleName: cycle.name,
              sectionName: row.props.linkToSection?.[cycle.uuid],
            })}
          >
            {colHeaderLabel}
          </Link>
        </>
      ) : (
        colHeaderLabel
      )}
    </DataCell>
  )
}

export default CellHeader
