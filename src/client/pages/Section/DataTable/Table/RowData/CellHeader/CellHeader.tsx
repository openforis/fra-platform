import './CellHeader.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import classNames from 'classnames'

import { AssessmentName } from 'meta/assessment/assessment'
import { Col } from 'meta/assessment/col'
import { Cols } from 'meta/assessment/cols'
import { Row } from 'meta/assessment/row'
import { Routes } from 'meta/routes'

import { useCycle } from 'client/store/meta/hooks/cycles'
import { useCountryIso } from 'client/hooks'
import { DataCell } from 'client/components/DataGrid'

type Props = {
  assessmentName: AssessmentName
  col: Col
  firstCol?: boolean
  firstHighlightCol?: boolean
  highlighted?: boolean
  lastCol?: boolean
  lastHighlightCol?: boolean
  lastRow?: boolean
  row: Row
}

const CellHeader: React.FC<Props> = (props) => {
  const { assessmentName, col, firstCol, firstHighlightCol, highlighted, lastCol, lastHighlightCol, lastRow, row } =
    props

  const { t } = useTranslation()
  const cycle = useCycle()
  const countryIso = useCountryIso()

  let colHeaderLabel = Cols.getLabel({ cycle, col, t })
  const variableNo = col.props.variableNo?.[cycle.uuid]
  if (variableNo) colHeaderLabel = `${colHeaderLabel} (${variableNo})`
  const { gridColumn, gridRow, ...colHeaderStyle } = Cols.getStyle({ col, cycle })
  const classes = Cols.getClassNames({ col, cycle })

  const headerCell = row.cols.every((col) => Cols.isReadOnly({ cycle, row, col }))
  const subcategory = row.props.categoryLevel > 0

  return (
    <DataCell
      className={classNames(
        'table-grid__data-cell header',
        {
          [`subcategory${row.props.categoryLevel} left`]: subcategory,
          'category left': !subcategory && !headerCell,
          left: !subcategory && headerCell,
        },
        classes
      )}
      firstCol={firstCol}
      firstHighlightCol={firstHighlightCol}
      gridColumn={gridColumn}
      gridRow={gridRow}
      header
      highlighted={highlighted}
      lastCol={lastCol}
      lastHighlightCol={lastHighlightCol}
      lastRow={lastRow}
      style={colHeaderStyle}
    >
      {row.props.linkToSection?.[cycle.uuid] ? (
        <>
          <div className="only-print">{colHeaderLabel}</div>
          <Link
            className="link no-print"
            to={Routes.Section.generatePath({
              assessmentName,
              countryIso,
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
