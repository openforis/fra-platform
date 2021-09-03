import React from 'react'

import useI18n from '@webapp/store/app/hooks/useI18n'

type Props = {
  showSections: boolean
  setShowSections: (showSections: boolean) => void
}

const ButtonToggleAll: React.FC<Props> = (props) => {
  const { setShowSections, showSections } = props
  const i18n = useI18n()

  return (
    <button
      className="btn-s nav-assessment-header__btn-toggle-sections"
      onClick={() => setShowSections(!showSections)}
      type="button"
    >
      {i18n.t(`navigation.${showSections ? 'hideAll' : 'showAll'}`)}
    </button>
  )
}

export default ButtonToggleAll
