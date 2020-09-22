import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useCountryIso, useGetRequest, useI18n } from '@webapp/components/hooks'
import * as FRA from '@common/assessment/fra'
import * as NumberUtils from '@common/bignumberUtils'

const ResultsTable = (props) => {
  const { section } = props
  const countryIso = useCountryIso()
  const i18n = useI18n()

  const { data = [], dispatch: fetchData } = useGetRequest(`/api/contentCheck/${countryIso}/${section}`)

  useEffect(fetchData, [countryIso])

  const rowHeaders = [
    'forest_area',
    'other_wooded_land',
    'primary_forest_percent',
    'protected_forest_percent',
    'management_plan_percent',
    'certified_area',
    'bamboo',
    'mangroves',
  ]
  const colHeaders = FRA.years

  const mapped = {}
  rowHeaders.forEach((rowHeader) => {
    FRA.years.forEach((year) => {
      mapped[`${rowHeader}/${year}`] = (
        data.find((entry) => entry.year === String(year) && entry.rowName === rowHeader) || {}
      ).value
    })
  })

  const getValue = (rowHeader, year) => NumberUtils.formatNumber(mapped[`${rowHeader}/${year}`])

  return (
    <table className="fra-table data-table">
      <thead>
        <tr>
          <th className="fra-table__header-cell-left">{i18n.t(`contentCheck.${section}`)}</th>
          {colHeaders.map((rowHeader) => (
            <th className="fra-table__header-cell" key={`${section}/${rowHeader}`}>
              {rowHeader}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rowHeaders.map((rowHeader) => (
          <tr>
            <th className="fra-table__category-cell" key={rowHeader}>
              {i18n.t(`contentCheck.${rowHeader}`)}
            </th>
            {FRA.years.map((year) => (
              <td key={`${rowHeader}/${year}`} className="fra-table__cell">
                {getValue(rowHeader, year)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

ResultsTable.propTypes = {
  section: PropTypes.string.isRequired,
}

export default ResultsTable
