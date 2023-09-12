import React from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  showSections: boolean
  setShowSections: (showSections: boolean) => void
}

const ButtonToggleAll: React.FC<Props> = (props) => {
  const { setShowSections, showSections } = props
  const { t } = useTranslation()

  return (
    <button
      className="btn-s nav-header__btn-toggle-sections"
      onClick={() => setShowSections(!showSections)}
      type="button"
    >
      {t(`navigation.${showSections ? 'hideAll' : 'showAll'}`)}
    </button>
  )
}

export default ButtonToggleAll
