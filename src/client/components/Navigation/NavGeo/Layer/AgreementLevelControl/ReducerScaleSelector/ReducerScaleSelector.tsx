import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ExtraEstimation } from 'meta/geo'
import { Layer, LayerSectionKey } from 'meta/geo/layer'

import { useAppDispatch } from 'client/store'
import { GeoActions, useGeoExtaEstimation } from 'client/store/ui/geo'
import { useCountryIso } from 'client/hooks'
import Button, { ButtonSize } from 'client/components/Buttons/Button'
import SelectPrimary from 'client/components/Inputs/SelectPrimary'
import OptionLabel from 'client/components/Navigation/NavGeo/Grid/OptionLabel'

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
    <>
      <div className="geo-options-grid__one-col">
        <OptionLabel>{t('geo.estimateCustomAgreementArea')}</OptionLabel>
      </div>
      <div className="geo-options-grid__one-col">
        <SelectPrimary isClearable={false} onChange={handleScaleChange} options={scaleOptions} value={selectedScale} />
      </div>

      <Button
        className="geo-options-grid__one-col centered"
        disabled={isLoading || false}
        label={t('common.calculate')}
        onClick={handleSubmit}
        size={ButtonSize.s}
      />

      {errorKey && (
        <OptionLabel className="geo-options-grid__one-col geo-options-grid__error">{t(errorKey)}</OptionLabel>
      )}
    </>
  )
}

export default ReducerScaleSelector
