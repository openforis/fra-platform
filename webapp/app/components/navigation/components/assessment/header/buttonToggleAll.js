import React from 'react'
import PropTypes from 'prop-types'
import useI18n from '@webapp/components/hooks/useI18n'

const ToggleAllButton = (props) => {
  const { setShowSections, showSections } = props
  const i18n = useI18n()

  return (
    <button
      type="button"
      className="btn-s nav-assessment-header__btn-toggle-sections"
      onClick={() => setShowSections(!showSections)}
    >
      {i18n.t(`navigation.${showSections ? 'hideAll' : 'showAll'}`)}
    </button>
  )
}

ToggleAllButton.propTypes = {
  showSections: PropTypes.bool.isRequired,
  setShowSections: PropTypes.func.isRequired,
}

export default ToggleAllButton
