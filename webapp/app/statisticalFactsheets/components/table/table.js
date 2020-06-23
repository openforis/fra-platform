import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useI18n } from '@webapp/components/hooks'
import useGetRequest from '@webapp/components/hooks/useGetRequest'

const Table = (props) => {
  const i18n = useI18n()
  const { url, tableHeads, section } = props

  const { data, dispatch: fetchData } = useGetRequest(url)

  useEffect(fetchData, [url])

  if (!data) {
    return null
  }

  const t = (value) => (Number.isNaN(+value) ? i18n.t(`statisticalFactsheets.${section}.${value}`) : value)

  return (
    <table className="fra-table">
      <thead>
        <tr>
          {tableHeads.map((key) => (
            <th key={key} className="fra-table__header-cell">
              {i18n.t(t(key))}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.rowName}>
            {tableHeads.map((key) => (
              <td key={`${row.rowName}-${row[key]}-${key}`} className="fra-table__calculated-cell">
                {t(row[key])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

Table.propTypes = {
  tableHeads: PropTypes.array.isRequired,
  url: PropTypes.string.isRequired,
  section: PropTypes.string.isRequired,
}

export default Table
