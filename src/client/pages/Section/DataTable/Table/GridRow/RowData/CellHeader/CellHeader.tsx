import './CellHeader.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import classNames from 'classnames'

import { AssessmentName, Col, Cols, Row } from 'meta/assessment'
import { Routes } from 'meta/routes'

import { useCycle } from 'client/store/assessment'
import { useCountryIso } from 'client/hooks'
import { DataCell } from 'client/components/DataGrid'

type Props = {
  assessmentName: AssessmentName
  col: Col
  lastRow?: boolean
  row: Row
}

const CellHeader: React.FC<Props> = (props) => {
  const { assessmentName, col, lastRow, row } = props

  const { t } = useTranslation()
  const cycle = useCycle()
  const countryIso = useCountryIso()

  let colHeaderLabel = Cols.getLabel({ cycle, col, t })
  const variableNo = col.props.variableNo?.[cycle.uuid]
  if (variableNo) colHeaderLabel = `${colHeaderLabel} (${variableNo})`
  const { gridColumn, gridRow, ...colHeaderStyle } = Cols.getStyle({ col, cycle })
  const classes = Cols.getClassNames({ col, cycle })

  // TODO: revisit the concept of headerCell
  const headerCell = row.cols.every((col) => Cols.isReadOnly({ cycle, row, col }))
  const subcategory = row.props.categoryLevel > 0

  return (
    <DataCell
      className={classNames(
        'table-grid__data-cell',
        {
          [`subcategory${row.props.categoryLevel} left`]: subcategory,
          'category left': !subcategory && !headerCell,
          left: !subcategory && headerCell,
        },
        classes
      )}
      gridColumn={gridColumn}
      gridRow={gridRow}
      header
      lastRow={lastRow}
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

CellHeader.defaultProps = {
  lastRow: false,
}

export default CellHeader
