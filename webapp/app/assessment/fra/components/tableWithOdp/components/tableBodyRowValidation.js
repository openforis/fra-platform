import React from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'

const TableBodyRowValidation = props => {
  const { row, fra } = props
  const validationErrorMessages = row.validationErrorMessages(fra)

  if (R.all(R.isNil, validationErrorMessages)) {
    return null
  }

  return (
    <tr key="validationError" className="no-print">
      {
        validationErrorMessages.map((errorMsgs, colIdx) =>
          <td className="fra-table__validation-cell" key={colIdx}>
            <div className="fra-table__validation-container">
              {
                errorMsgs.map((errorMsg, errorIdx) => (
                    <div className="fra-table__validation-error" key={errorIdx}>
                      {errorMsg}
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

TableBodyRowValidation.propTypes = {
  fra: PropTypes.array.isRequired,
  row: PropTypes.object.isRequired,
}

export default TableBodyRowValidation
