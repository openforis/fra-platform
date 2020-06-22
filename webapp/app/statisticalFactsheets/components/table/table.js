import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useI18n } from '@webapp/components/hooks'
import useGetRequest from '@webapp/components/hooks/useGetRequest'

const Table = (props) => {
  const i18n = useI18n()
  const { url, tableHeads } = props

  const { data, dispatch: fetchData } = useGetRequest(url)

  useEffect(fetchData, [url])

  if (!data) {
    return null
  }

  return (
    <table className="fra-table">
      <thead>
        <tr>
          {tableHeads.map((key) => (
            <th key={key} className="fra-table__header-cell">
              {i18n.t(key)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr>
            {tableHeads.map((key) => (
              <td key={row[key]} className="fra-table__calculated-cell">
                {i18n.t(row[key])}
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
}

export default Table
