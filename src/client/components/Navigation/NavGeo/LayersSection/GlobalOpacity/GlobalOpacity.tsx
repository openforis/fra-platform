import './GlobalOpacity.scss'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { LayerSectionKey } from 'meta/geo'

import { useAppDispatch } from 'client/store'
import { GeoActions } from 'client/store/ui/geo'
import { useCountryIso } from 'client/hooks'
import InputRange from 'client/components/Inputs/InputRange'
import OptionLabel from 'client/components/Navigation/NavGeo/Grid/OptionLabel'
import OptionsGrid from 'client/components/Navigation/NavGeo/Grid/OptionsGrid'

type Props = {
  sectionKey: LayerSectionKey
}

const GlobalOpacity: React.FC<Props> = (props) => {
  const { sectionKey } = props

  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const countryIso = useCountryIso()

  const [globalOpacity, setGlobalOpacity] = useState(0.5)

  const handleGlobalOpacityChange = (event: React.FormEvent<HTMLInputElement>) => {
    const newOpacity = Math.round(Number(event.currentTarget.value) / 10) / 10
    setGlobalOpacity(newOpacity)
    dispatch(GeoActions.setSectionGlobalOpacity({ sectionKey, countryIso, opacity: newOpacity }))
  }

  return (
    <OptionsGrid className="nav-geo-global-opacity">
      <OptionLabel>{t('geo.globalOpacity')}</OptionLabel>
      <InputRange onChange={handleGlobalOpacityChange} unit="%" value={globalOpacity * 100} />
    </OptionsGrid>
  )
}

export default GlobalOpacity
