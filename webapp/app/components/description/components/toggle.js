import React from 'react'
import PropTypes from 'prop-types'

const Toggle = ({ setOpen, open, i18n }) => {
  return (
    <span
      role="button"
      aria-label=""
      tabIndex={0}
      className="fra-description__link no-print"
      onClick={() => {
        setOpen(!open)
      }}
      onKeyDown={() => {}}
    >
      {open ? i18n.t('description.done') : i18n.t('description.edit')}
    </span>
  )
}

Toggle.propTypes = {
  setOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  i18n: PropTypes.object.isRequired,
}

export default Toggle
