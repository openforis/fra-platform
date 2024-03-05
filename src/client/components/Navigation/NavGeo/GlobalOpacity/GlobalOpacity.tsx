import './GlobalOpacity.scss'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { LayerSectionKey } from 'meta/geo'

import { useAppDispatch } from 'client/store'
import { GeoActions } from 'client/store/ui/geo'
import { useCountryIso } from 'client/hooks'
import InputRange from 'client/components/Inputs/InputRange'

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
    <div className="geo-global-opacity__container">
      <span>{t('geo.globalOpacity')}</span>
      <InputRange onChange={handleGlobalOpacityChange} unit="%" value={globalOpacity * 100} />
    </div>
  )
}

export default GlobalOpacity
