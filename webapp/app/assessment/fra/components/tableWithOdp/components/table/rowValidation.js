import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import * as R from 'ramda'

import useI18n from '@webapp/components/hooks/useI18n'

const RowValidation = props => {
  const { row, fra } = props

  const i18n = useI18n()
  const validationMessages = useSelector(row.validationMessages(fra))

  if (R.all(R.isNil, validationMessages) || R.isEmpty(validationMessages)) {
    return null
  }

  return (
    <tr key="validationError" className="no-print">
      {
        validationMessages.map((errorMsgs, colIdx) =>
          <td className="fra-table__validation-cell" key={colIdx}>
            <div className="fra-table__validation-container">
              {
                errorMsgs.map(({ key, params = {} }, errorIdx) => (
                    <div className="fra-table__validation-error" key={errorIdx}>
                      {i18n.t(key, { ...params })}
                    </div>
                  )
                )
              }
            </div>
          </td>
        )
      }
    </tr>
  )
}

RowValidation.propTypes = {
  fra: PropTypes.array.isRequired,
  row: PropTypes.object.isRequired,
}

export default RowValidation
