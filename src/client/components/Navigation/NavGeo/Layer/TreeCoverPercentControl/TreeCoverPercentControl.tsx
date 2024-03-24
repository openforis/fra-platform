import React from 'react'
import { useTranslation } from 'react-i18next'

import { Layer, LayerSectionKey } from 'meta/geo'

import { useAppDispatch } from 'client/store'
import { GeoActions, useGeoLayer } from 'client/store/ui/geo'
import ButtonCheckbox from 'client/components/Buttons/ButtonCheckbox'
import OptionLabel from 'client/components/Navigation/NavGeo/Grid/OptionLabel'
import { useFetchNewLayerOption } from 'client/pages/Geo/Map/hooks'

type Props = {
  layer: Layer
  sectionKey: LayerSectionKey
}

const TreeCoverPercentControl: React.FC<Props> = (props) => {
  const { layer, sectionKey } = props
  const layerKey = layer.key

  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const layerState = useGeoLayer(sectionKey, layerKey)
  useFetchNewLayerOption(sectionKey, layerKey, 'gteTreeCoverPercent', layer)

  const handlePercentageChange = (percentage: number) => {
    dispatch(GeoActions.setLayerGteTreeCoverPercent({ sectionKey, layerKey, gteTreeCoverPercent: percentage }))
  }

  return (
    <>
      <div className="geo-options-grid__one-col centered">
        <OptionLabel>{t('geo.selectMinTreeCoverPercent')}</OptionLabel>
      </div>
      <div className="geo-options-grid__one-col centered geo-options-grid__flex">
        {layer.options?.gteTreeCoverPercent.map((percentage) => {
          return (
            <ButtonCheckbox
              key={`${sectionKey}-${layerKey}-${percentage}`}
              checked={layerState?.options?.gteTreeCoverPercent === percentage}
              label={`${percentage} %`}
              onClick={() => handlePercentageChange(percentage)}
            />
          )
        })}
      </div>
    </>
  )
}

export default TreeCoverPercentControl
