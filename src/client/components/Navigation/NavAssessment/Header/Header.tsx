import './Header.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { Areas } from '@meta/area'

import { useCountry } from '@client/store/assessment'
import { useUser } from '@client/store/user'
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

  const user = useUser()
  const { t } = useTranslation()

  const isCountry = Areas.isISOCountry(countryIso)
  const isDataExportView = useIsDataExportView()

  const { deskStudy } = country.props

  return (
    <div className="nav-assessment-header">
      {user && isCountry && (
        <div>
          {isDataExportView ? ` - ${t('common.dataExport')}` : ''}
          {deskStudy && <div className="desk-study">({t('assessment.deskStudy')})</div>}
        </div>
      )}

      <ButtonToggleAll showSections={showSections} setShowSections={setShowSections} />
    </div>
  )
}

export default Header
