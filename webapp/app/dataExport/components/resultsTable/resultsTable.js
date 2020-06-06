import './resultsTable.less'
import React, { useLayoutEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router'

import { useI18n } from '@webapp/components/hooks'
import ButtonTableExport from '@webapp/components/buttonTableExport'
import * as NumberUtils from '@common/bignumberUtils'
import { getLabel as getColumnLabel } from '../columnSelect'

const ResultsTable = (props) => {
  const { results, selection, columns, fetchingResults } = props
  const filteredColumns = columns.filter((column) => selection.columns.map(({ param }) => param).includes(column))

  const { assessmentType, section } = useParams()
  const i18n = useI18n()
  const tableRef = useRef(null)
  const [exportDisabled, setExportDisabled] = useState(true)

  useLayoutEffect(() => {
    setExportDisabled(fetchingResults)
  }, [fetchingResults])

  return (
    <div className="results-table">
      <ButtonTableExport tableRef={tableRef} filename={`${assessmentType}-${section}`} disabled={exportDisabled} />
      <table ref={tableRef} className="fra-table data-table">
        <thead>
          <tr>
            <th className="fra-table__header-cell-left" colSpan="1" rowSpan="2">
              &nbsp;
            </th>
            <th className="fra-table__header-cell" colSpan={selection.columns.length + 1}>
              {i18n.t(selection.variable.label)}
            </th>
          </tr>
          <tr>
            {filteredColumns.map((column) => (
              <th key={column} className="fra-table__header-cell">
                {i18n.t(getColumnLabel(column))}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {selection.countries.map(({ param: countryIso, label }) => (
            <tr key={label}>
              <th className="fra-table__category-cell" colSpan="1">
                {i18n.t(label)}
              </th>
              {filteredColumns.map((column) => {
                let value = results[countryIso] && results[countryIso][column]
                if (!Number.isNaN(value)) value = NumberUtils.formatNumber(value)
                if (value === 'NaN') value = ''

                return (
                  <td key={`${countryIso}${column}${value}`} className="fra-table__cell">
                    <div className="number-input__readonly-view">{value}</div>
                  </td>
                )
              })}
            </tr>
          ))}
          <tr>
            <td colSpan={selection.columns.length + 1} className="fra-table__validation-cell">
              <div className="fra-table__validation-container copyright">
                &copy; FRA {`${new Date().getFullYear()}`}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

ResultsTable.propTypes = {
  fetchingResults: PropTypes.bool.isRequired,
  results: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  selection: PropTypes.object.isRequired,
}

export default ResultsTable
