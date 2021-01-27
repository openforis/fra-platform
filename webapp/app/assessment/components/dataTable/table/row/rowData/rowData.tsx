import React from 'react'
import * as BasePaths from '@webapp/main/basePaths'
import { useCountryIso, useI18n } from '@webapp/components/hooks'
import { Link } from 'react-router-dom'
import ReviewIndicator from '@webapp/app/assessment/components/review/reviewIndicator'
import { TableSpec } from '@webapp/app/assessment/components/section/sectionSpec'
import useClassName from './useClassName'
import Cell from './cell'
import CellOdp from './cellOdp'

type Props = {
  data: any[]
  assessmentType: string
  sectionName: string
  tableSpec: any
  row: any
  disabled: boolean
}
const RowData = (props: Props) => {
  const countryIso = useCountryIso()
  const i18n = useI18n()
  const { data, assessmentType, sectionName, tableSpec, row, disabled } = props
  const tableName = TableSpec.getName(tableSpec)
  const odp = TableSpec.isOdp(tableSpec)
  const secondary = TableSpec.isSecondary(tableSpec)
  const { idx: rowIdx, cols, validator, calculateFn, variableName } = row
  const colHeader = cols[0]
  const colHeaderLabel = colHeader.label ? colHeader.label : (i18n as any).t(colHeader.labelKey, colHeader.labelParams)
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
        ? data.map((datum) => (
            <CellOdp
              key={datum.name || datum.year}
              assessmentType={assessmentType}
              sectionName={sectionName}
              tableSpec={tableSpec}
              variableName={variableName}
              disabled={disabled}
              data={data}
              datum={datum}
              validator={validator}
              calculateFn={calculateFn}
            />
          ))
        : colsData.map((col: any) => (
            <Cell
              key={col.idx}
              data={data}
              assessmentType={assessmentType}
              sectionName={sectionName}
              tableSpec={tableSpec}
              disabled={disabled}
              rowIdx={rowIdx}
              col={col}
            />
          ))}

      <td className="fra-table__row-anchor-cell">
        <div className="fra-table__review-indicator-anchor">
          {!disabled && !secondary && (
            <ReviewIndicator
              // @ts-expect-error ts-migrate(2322) FIXME: Type '{ section: string; title: any; target: any[]... Remove this comment to see the full error message
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
