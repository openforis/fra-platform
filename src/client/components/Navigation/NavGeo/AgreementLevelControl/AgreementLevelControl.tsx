import './AgreementLevelControl.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { Layer, LayerSectionKey } from 'meta/geo/layer'

import { useAppDispatch } from 'client/store'
import { GeoActions } from 'client/store/ui/geo'
import AgreementLevelSelector from 'client/components/Navigation/NavGeo/AgreementLevelSelector'
import ReducerScaleSelector from 'client/components/Navigation/NavGeo/ReducerScaleSelector'
import { useFetchAgreementLevelLayer } from 'client/pages/Geo/GeoMap/hooks'

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

  const handleAgreementLevelChange = (level: number) => {
    dispatch(GeoActions.setAgreementLevel({ layerKey, level, sectionKey }))
  }

  return (
    <>
      <div className="geo-agreement-level-control__container">
        <p>
          <small>{`${t('geo.chooseAgreementLevel')} `}</small>
          <small>{t('geo.agreementLevelExplanation')}</small>
        </p>
        <AgreementLevelSelector layer={layer} onChange={handleAgreementLevelChange} sectionKey={sectionKey} />
      </div>
      <ReducerScaleSelector layer={layer} sectionKey={sectionKey} />
    </>
  )
}

export default AgreementLevelControl
