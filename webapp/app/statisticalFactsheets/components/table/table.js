import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useI18n, useGetRequest } from '@webapp/components/hooks'

import * as APIUtils from '../../utils/apiUtils'

const Table = (props) => {
  const i18n = useI18n()
  const { tableHeads, section, levelIso } = props
  const url = APIUtils.getUrl(levelIso)
  const params = APIUtils.getParams(section)

  const { data, dispatch: fetchData } = useGetRequest(url, {
    params,
  })

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
  levelIso: PropTypes.string.isRequired,
  section: PropTypes.string.isRequired,
}

export default Table
