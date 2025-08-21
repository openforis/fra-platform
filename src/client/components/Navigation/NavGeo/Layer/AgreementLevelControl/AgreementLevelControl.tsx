import './AgreementLevelControl.scss'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { Layer, LayerSectionKey } from 'meta/geo/layer'

import { LayersActions } from 'client/store/geo/layers/actions'
import { useAppDispatch } from 'client/store/hooks'
import OptionLabel from 'client/components/Navigation/NavGeo/Grid/OptionLabel'
import AgreementLevelSelector from 'client/components/Navigation/NavGeo/Layer/AgreementLevelControl/AgreementLevelSelector'
import ReducerScaleSelector from 'client/components/Navigation/NavGeo/Layer/AgreementLevelControl/ReducerScaleSelector'
import { useFetchAgreementLevelLayer } from 'client/pages/Geo/Map/hooks'

type Props = {
  layer: Layer
  sectionKey: LayerSectionKey
}

const AgreementLevelControl: React.FC<Props> = (props) => {
  const { layer, sectionKey } = props
  const layerKey = layer.key

  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  useFetchAgreementLevelLayer(sectionKey, layerKey)

  const handleAgreementLevelChange = useCallback<(value: number) => void>(
    (value) => {
      dispatch(LayersActions.setAgreementProperty({ key: 'level', layerKey, value }))
    },
    [dispatch, layerKey]
  )

  return (
    <>
      <div className="geo-options-grid__one-col centered">
        <OptionLabel>
          <span>{`${t('geo.chooseAgreementLevel')} `}</span>
          <span>{t('geo.agreementLevelExplanation')}</span>
        </OptionLabel>
      </div>
      <AgreementLevelSelector layer={layer} onChange={handleAgreementLevelChange} sectionKey={sectionKey} />
      <ReducerScaleSelector layer={layer} sectionKey={sectionKey} />
    </>
  )
}

export default AgreementLevelControl
