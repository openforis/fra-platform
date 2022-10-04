import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import classNames from 'classnames'

import { Cols } from '@meta/assessment'
import { Topics } from '@meta/messageCenter'

import { useCycle } from '@client/store/assessment'
import { useTopicKeys } from '@client/store/ui/messageCenter/hooks'
import { useCountryIso } from '@client/hooks'
import { ClientRoutes } from '@client/clientRoutes'
import ReviewIndicator from '@client/components/ReviewIndicator'

import { Props } from '../props'
// import useClassName from './useClassName'
import Cell from './Cell'
// import CellOdp from './CellOdp'

const RowData: React.FC<Props> = (props) => {
  const { data, assessmentName, sectionName, table, row, disabled } = props

  const { t } = useTranslation()
  const countryIso = useCountryIso()
  const cycle = useCycle()

  const { secondary } = table.props
  const { cols } = row
  // const { index /* variableName */ } = row.props
  const colHeader = cols[0]
  let colHeaderLabel = Cols.getLabel({ cycle, col: colHeader, t })
  const variableNo = colHeader.props.variableNo?.[cycle.uuid]
  if (variableNo) colHeaderLabel = `${colHeaderLabel} (${variableNo})`
  const colHeaderStyle = Cols.getStyle({ col: colHeader, cycle })

  const colsData = cols.slice(1, cols.length)
  // const className = useClassName(reviewTarget)

  const openTopics = useTopicKeys()
  const headerCell = cols.every((col) => Cols.isReadOnly({ row, col }))
  const subcategory = colHeaderLabel.includes(`…`)

  return (
    <tr className={openTopics.includes(row.uuid) ? 'fra-row-comments__open' : ''}>
      <th
        className={classNames({
          'fra-table__subcategory-cell': subcategory,
          'fra-table__category-cell': !subcategory && !headerCell,
          'fra-table__header-cell-left': !subcategory && headerCell,
        })}
        colSpan={colHeaderStyle.colSpan}
        rowSpan={colHeaderStyle.rowSpan}
      >
        {row.props.linkToSection ? (
          <>
            {/* TODO - print view <div className="only-print">{colHeaderValue}</div> */}
            <Link
              to={ClientRoutes.Assessment.Section.getLink({
                countryIso,
                assessmentName,
                cycleName: cycle.name,
                sectionName: row.props.linkToSection,
              })}
              className="link no-print"
            >
              {colHeaderLabel}
            </Link>
          </>
        ) : (
          colHeaderLabel
        )}
      </th>

      {colsData.map((col) => (
        <Cell
          key={col.uuid}
          data={data}
          assessmentName={assessmentName}
          sectionName={sectionName}
          table={table}
          disabled={disabled}
          rowIndex={Number(row.props.index)}
          col={col}
          row={row}
        />
      ))}

      {!disabled && !secondary && (
        <td className="fra-table__review-cell no-print">
          <ReviewIndicator title={colHeaderLabel} topicKey={Topics.getDataReviewTopicKey(row)} />
        </td>
      )}
    </tr>
  )
}

export default RowData
