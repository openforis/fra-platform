import './Header.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { useCountry } from '@client/store/assessment'
import { useCountryIso, useIsDataExportView } from '@client/hooks'

import ButtonToggleAll from './ButtonToggleAll'

type Props = {
  showSections: boolean
  setShowSections: (showSections: boolean) => void
}

const Header: React.FC<Props> = (props) => {
  const { showSections, setShowSections } = props
  const countryIso = useCountryIso()
  const country = useCountry(countryIso)

  const { t } = useTranslation()

  const isDataExportView = useIsDataExportView()

  const { deskStudy } = country?.props ?? {}

  return (
    <div className="nav-assessment-header">
      <div>
        {isDataExportView ? t('common.dataExport') : ''}
        {deskStudy && <div className="desk-study">({t('assessment.deskStudy')})</div>}
      </div>

      <ButtonToggleAll showSections={showSections} setShowSections={setShowSections} />
    </div>
  )
}

export default Header
