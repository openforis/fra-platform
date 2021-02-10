import React from 'react'
import useI18n from '@webapp/components/hooks/useI18n'

type Props = {
  showSections: boolean
  setShowSections: (...args: any[]) => any
}
const ToggleAllButton = (props: Props) => {
  const { setShowSections, showSections } = props
  const i18n = useI18n()
  return (
    <button
      type="button"
      className="btn-s nav-assessment-header__btn-toggle-sections"
      onClick={() => setShowSections(!showSections)}
    >
      {(i18n as any).t(`navigation.${showSections ? 'hideAll' : 'showAll'}`)}
    </button>
  )
}
export default ToggleAllButton
