import React from 'react'
import * as R from 'ramda'

const CalculatedCell = props => {
  const {
    rowIdx,
    colIdx,
    validator,
    calculateValue
  } = props
  const valid = validator ? validator(props, rowIdx, colIdx).valid : true
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
