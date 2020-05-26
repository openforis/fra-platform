import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { useI18n } from '@webapp/components/hooks'
import ButtonTableExport from '@webapp/components/buttonTableExport'
import { useParams } from 'react-router'

import * as NumberUtils from '@common/bignumberUtils'

const ResultsTable = (props) => {
  const { results, selection } = props
  const { assessmentType, section } = useParams()
  const tableRef = useRef(null)
  const i18n = useI18n()

  return (
    <div style={{ position: 'relative' }}>
      <ButtonTableExport tableRef={tableRef} filename={`${assessmentType}-${section}`} />
      <table ref={tableRef} className="fra-table data-table">
        <thead>
          <tr>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <th className="fra-table__header-cell-left" colSpan="1" rowSpan="2" />
            <th className="fra-table__header-cell" colSpan={selection.columns.length + 1}>
              {i18n.t(selection.variable.label)}
            </th>
          </tr>
          <tr>
            {/*
              use all columns filtered
            */}
            {selection.columns.map((column) => (
              <th key={column.param} className="fra-table__header-cell">
                {i18n.t(column.label)}
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
              {results[countryIso] &&
                Object.entries(results[countryIso]).map(([year, value]) => {
                  return (
                    <td key={`${countryIso}${year}${value}`} className="fra-table__cell">
                      <div className="number-input__readonly-view">
                        {Number.isNaN(value) ? value : NumberUtils.formatNumber(value)}
                      </div>
                    </td>
                  )
                })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

ResultsTable.propTypes = {
  results: PropTypes.object.isRequired,
  selection: PropTypes.object.isRequired,
}

export default ResultsTable
