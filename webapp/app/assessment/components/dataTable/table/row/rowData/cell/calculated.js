import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const Calculated = (props) => {
  const { col, rowIdx } = props
  const { calculateFn, formatFn } = col

  const value = useSelector(calculateFn(col.idx, rowIdx))

  return formatFn(value)
}

Calculated.propTypes = {
  col: PropTypes.object.isRequired,
  rowIdx: PropTypes.number.isRequired,
}

export default Calculated
