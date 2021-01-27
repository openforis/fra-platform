import './buttonCheckBox.less'

import React from 'react'
import PropTypes from 'prop-types'
import { useI18n } from '@webapp/components/hooks'

const ButtonCheckBox = (props) => {
  const i18n = useI18n()
  const { onClick, checked, className, labelParam, suffix } = props
  let { label } = props
  label = Array.isArray(label) ? label : [label]

  return (
    <button type="button" className={`btn-s btn-checkbox ${className}`} onClick={onClick}>
      <div className={`fra-checkbox${checked ? ' checked' : ''}`} />
      <div>{label.map((key) => `${labelParam ? i18n.t(key, labelParam) : i18n.t(key)} `)}</div>
      {suffix && <span className="suffix">{suffix}</span>}
    </button>
  )
}

ButtonCheckBox.defaultProps = {
  className: '',
  labelParam: null,
  suffix: null,
}

ButtonCheckBox.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.oneOfType([PropTypes.array, PropTypes.string]).isRequired,
  labelParam: PropTypes.object,
  className: PropTypes.string,
  checked: PropTypes.bool.isRequired,
  suffix: PropTypes.string,
}

export default ButtonCheckBox
