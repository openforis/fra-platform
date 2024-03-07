import './ReducerScaleSelector.scss'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ExtraEstimation } from 'meta/geo'
import { Layer, LayerSectionKey } from 'meta/geo/layer'

import { useAppDispatch } from 'client/store'
import { GeoActions, useGeoExtaEstimation } from 'client/store/ui/geo'
import { useCountryIso } from 'client/hooks'
import Button, { ButtonSize } from 'client/components/Buttons/Button'
import Select from 'client/components/Inputs/Select'

import { useScaleOptions } from './hooks/useScaleOptions'

type Props = {
  layer: Layer
  sectionKey: LayerSectionKey
}

const ReducerScaleSelector: React.FC<Props> = (props) => {
  const { layer, sectionKey } = props

  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const countryIso = useCountryIso()

  const scales = layer.options?.agreementLayer?.reducerScales ?? []
  const scaleOptions = useScaleOptions({ scales })

  const [selectedScale, setSelectedScale] = useState<string>(scales.at(0)?.toString() ?? '')

  const extraEstimation = ExtraEstimation.CustomRecipe
  const extraEstimationState = useGeoExtaEstimation(sectionKey, extraEstimation)
  const { errorKey, isLoading } = extraEstimationState ?? {}

  const handleScaleChange = (value: string) => {
    setSelectedScale(value)
  }

  const handleSubmit = () => {
    const scale = parseInt(selectedScale, 10)
    dispatch(
      GeoActions.postExtraEstimation({
        countryIso,
        sectionKey,
        scale,
        extraEstimation,
      })
    )
  }

  if (scales.length === 0) return null

  return (
    <div className="geo-reducer-scale__container">
      <span>{t('geo.estimateCustomAgreementArea')}</span>

      <div className="geo-reducer-scale__selector">
        <Select isClearable={false} onChange={handleScaleChange} options={scaleOptions} value={selectedScale} />
      </div>

      <Button
        className="geo-reducer-scale__submit-button"
        disabled={isLoading || false}
        label={t('common.calculate')}
        onClick={handleSubmit}
        size={ButtonSize.s}
      />

      {errorKey && <p className="geo-reducer-scale__error-message">{t(errorKey)}</p>}
    </div>
  )
}

export default ReducerScaleSelector
