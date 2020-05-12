import React from 'react'
import * as R from 'ramda'
import useUserInfo from '@webapp/components/hooks/useUserInfo'

const CalculatedCell = props => {
  const {
    rowIdx,
    colIdx,
    validator,
    calculateValue
  } = props
  const userInfo = useUserInfo()
  
  const valid = userInfo && validator ? validator(props, rowIdx, colIdx).valid : true
  const valueFormatter = props.valueFormatter|| R.identity
  return <td className={`fra-table__calculated-cell ${valid ? '' : 'validation-error'}`}>
    {valueFormatter(calculateValue(props))}
  </td>
}

export default (cellSpec) => ({
  render: (props) => <CalculatedCell
    {...props}
    calculateValue={cellSpec.calculateValue}
    valueFormatter={cellSpec.valueFormatter}
    validator={cellSpec.validator}
  />
})
