import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import classNames from 'classnames'

import { Topics } from '@meta/messageCenter'

import { useCycle } from '@client/store/assessment'
import { useTopicKeys } from '@client/store/ui/messageCenter/hooks'
import { useCountryIso } from '@client/hooks'
import { BasePaths } from '@client/basePaths'
import ReviewIndicator from '@client/components/ReviewIndicator'

import { Props } from '../props'
// import useClassName from './useClassName'
import Cell from './Cell'
// import CellOdp from './CellOdp'

const RowData: React.FC<Props> = (props) => {
  const { data, assessmentName, sectionName, table, row, disabled } = props

  const i18n = useTranslation()
  const countryIso = useCountryIso()
  const cycle = useCycle()

  const { secondary } = table.props
  const { cols } = row
  // const { index /* variableName */ } = row.props
  const colHeader = cols[0]
  // const colHeaderLabel = colHeader.label ? colHeader.label : i18n.t(colHeader.labelKey, colHeader.labelParams)
  const colHeaderLabel = i18n.t(colHeader.props?.label?.key, colHeader.props?.label?.params ?? {})
  const colsData = cols.slice(1, cols.length)
  // const reviewTarget = [tableName, 'row', `${index}`]
  // const className = useClassName(reviewTarget)
  const colHeaderValue = `${colHeaderLabel}` // `${colHeaderLabel}${colHeader.variableNo ? ` (${colHeader.variableNo})` : ''}`

  const openTopics = useTopicKeys()
  const headerCell = row.props.readonly || row.props.calculateFn || cols.find((c) => c.props.calculateFn)
  const subcategory = colHeaderValue.includes(`…`)
  return (
    <tr className={openTopics.includes(row.uuid) ? 'fra-row-comments__open' : ''}>
      <th
        className={classNames({
          'fra-table__subcategory-cell': subcategory,
          'fra-table__category-cell': !subcategory && !headerCell,
          'fra-table__header-cell-left': !subcategory && headerCell,
        })}
        colSpan={colHeader.props.colSpan}
        rowSpan={colHeader.props.rowSpan}
      >
        {row.props.linkToSection ? (
          <>
            {/* TODO - print view <div className="only-print">{colHeaderValue}</div> */}
            <Link
              to={BasePaths.Assessment.section(countryIso, assessmentName, cycle.name, row.props.linkToSection)}
              className="link no-print"
            >
              {colHeaderValue}
            </Link>
          </>
        ) : (
          colHeaderValue
        )}
      </th>
      {/* TODO Handle odp */}
      {/* {odp */}
      {/*  ? data.map((datum: TableDatumODP) => ( */}
      {/*      <CellOdp */}
      {/*        key={datum.name || datum.year} */}
      {/*        assessmentName={assessmentName} */}
      {/*        sectionName={sectionName} */}
      {/*        table={table} */}
      {/*        rowSpec={row} */}
      {/*        variableName={variableName as keyof TableDatumODP} */}
      {/*        disabled={disabled} */}
      {/*        data={data} */}
      {/*        datum={datum} */}
      {/*      /> */}
      {/*    )) */}
      {/*  : */}
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
        <td className="no-print">
          <ReviewIndicator title={colHeaderLabel} topicKey={Topics.getDataReviewTopicKey(row)} />
        </td>
      )}
    </tr>
  )
}

export default RowData
