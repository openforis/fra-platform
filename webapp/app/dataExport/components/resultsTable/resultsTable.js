import './resultsTable.less'
import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router'

import { useI18n } from '@webapp/components/hooks'
import ButtonTableExport from '@webapp/components/buttonTableExport'
import { getValue, getI18nKey } from '../../utils/format'

const ResultsTable = (props) => {
  const { results, selection, columns, resultsLoading } = props
  const { assessmentType, section } = useParams()
  const tableRef = useRef(null)
  const i18n = useI18n()

  const filteredColumns = columns.filter((column) => selection.columns.map(({ param }) => param).includes(column))

  return (
    <div className="results-table">
      <ButtonTableExport tableRef={tableRef} filename={`${assessmentType}-${section}`} />
      <table ref={tableRef} className="fra-table data-table">
        <thead>
          <tr>
            <th className="fra-table__header-cell-left" colSpan="1" rowSpan="2">
              &nbsp;
            </th>
            <th className="fra-table__header-cell" colSpan={selection.columns.length + 1}>
              {resultsLoading
                ? i18n.t('description.loading')
                : i18n.t(selection.variable.label, selection.variable.labelParam)}
            </th>
          </tr>
          <tr>
            {filteredColumns.map((column) => (
              <th key={column} className="fra-table__header-cell">
                {getI18nKey(column, section).map((key) => `${i18n.t(key)} `)}
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
                const { columnKey, value } = getValue(column, countryIso, results, section)
                return (
                  <td key={`${countryIso}${columnKey}${value}`} className="fra-table__cell">
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
  resultsLoading: PropTypes.bool.isRequired,
  results: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  selection: PropTypes.object.isRequired,
}

export default ResultsTable
