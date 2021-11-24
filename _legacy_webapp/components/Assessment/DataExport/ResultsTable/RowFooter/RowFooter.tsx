import React from 'react'

import { Dates } from '@core/utils'

const RowFooter: React.FC = () => {
  const date = new Date()

  return (
    <>
      <tr>
        <td className="fra-table__validation-cell">
          <div className="fra-table__validation-container copyright">&copy; FRA {`${date.getFullYear()}`}</div>
        </td>
      </tr>

      <tr>
        <td>
          <span className="timestamp">{Dates.format(date, 'yyyy-MM-dd')}</span>
        </td>
      </tr>
    </>
  )
}

export default RowFooter
