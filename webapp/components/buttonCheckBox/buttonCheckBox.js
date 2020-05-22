import './buttonCheckBox.less'

import React from 'react'
import PropTypes from 'prop-types'
import { useI18n } from '@webapp/components/hooks'

const ButtonCheckBox = (props) => {
  const i18n = useI18n()
  const { onClick, label, checked, className } = props
  return (
    <button type="button" className={`btn-s btn-checkbox ${className}`} onClick={onClick}>
      <div className={`fra-checkbox${checked ? ' checked' : ''}`} />
      <div>{i18n.t(label)}</div>
    </button>
  )
}

ButtonCheckBox.defaultProps = {
  className: '',
}

ButtonCheckBox.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  checked: PropTypes.bool.isRequired,
}

export default ButtonCheckBox
