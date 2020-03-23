import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import * as R from 'ramda'

import useI18n from '@webapp/components/hooks/useI18n'

const RowValidation = props => {
  const { row, data } = props
  const { getValidationMessages } = row

  const i18n = useI18n()
  const validationMessages = useSelector(getValidationMessages(data))

  if (R.all(R.isNil, validationMessages) || R.isEmpty(validationMessages)) {
    return null
  }

  return (
    <tr key="validationError" className="no-print">
      {validationMessages.map(errorMsgs => (
        <td className="fra-table__validation-cell" key={Math.random()}>
          <div className="fra-table__validation-container">
            {errorMsgs.map(({ key, params = {} }) => (
              <div className="fra-table__validation-error" key={key}>
                {i18n.t(key, { ...params })}
              </div>
            ))}
          </div>
        </td>
      ))}
    </tr>
  )
}

RowValidation.propTypes = {
  data: PropTypes.array.isRequired,
  row: PropTypes.object.isRequired,
}

export default RowValidation
