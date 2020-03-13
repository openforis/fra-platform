import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import { formatNumber } from '@common/bignumberUtils'

const Calculated = props => {
  const { col, rowIdx } = props
  const { calculateFn } = col

  const value = useSelector(calculateFn(col.idx, rowIdx))

  return <div>{formatNumber(value)}</div>
}

Calculated.propTypes = {
  col: PropTypes.object.isRequired,
  rowIdx: PropTypes.number.isRequired,
}

export default Calculated
