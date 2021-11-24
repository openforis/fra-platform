import React from 'react'
import { useSelector } from 'react-redux'

import { Objects } from '@core/utils'
import { useI18n } from '../../../../../../hooks'
import { ValidationMessage } from '../../../../../../sectionSpec'

import { Props } from '../props'

const RowValidation: React.FC<Props> = (props) => {
  const { row, data } = props

  const i18n = useI18n()
  const { getValidationMessages } = row
  const validationMessages: Array<Array<ValidationMessage>> = useSelector(getValidationMessages(data))

  if (Objects.isEmpty(validationMessages) || validationMessages.every(Objects.isNil)) {
    return null
  }

  return (
    <tr key="validationError" className="no-print">
      {validationMessages.map((messages, idx) => (
        <td className="fra-table__validation-cell" key={String(idx)}>
          <div className="fra-table__validation-container">
            {messages.map(({ key, params = {} }) => (
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

export default RowValidation
