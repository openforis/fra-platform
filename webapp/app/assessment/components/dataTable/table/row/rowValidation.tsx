import React from 'react'
import { useSelector } from 'react-redux'
import * as R from 'ramda'
import { useI18n } from '@webapp/components/hooks'

type Props = {
  data: any[]
  row: any
}
const RowValidation = (props: Props) => {
  const { row, data } = props
  const { getValidationMessages } = row
  const i18n = useI18n()
  const validationMessages: any = useSelector(getValidationMessages(data))
  if (R.all(R.isNil, validationMessages) || R.isEmpty(validationMessages)) {
    return null
  }
  return (
    <tr key="validationError" className="no-print">
      {(validationMessages as any).map((errorMsgs: any) => (
        <td className="fra-table__validation-cell" key={Math.random()}>
          <div className="fra-table__validation-container">
            {errorMsgs.map(({ key, params = {} }: any) => (
              <div className="fra-table__validation-error" key={key}>
                {(i18n as any).t(key, { ...params })}
              </div>
            ))}
          </div>
        </td>
      ))}
    </tr>
  )
}
export default RowValidation
