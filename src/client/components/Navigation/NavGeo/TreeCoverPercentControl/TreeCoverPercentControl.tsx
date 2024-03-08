import './TreeCoverPercentControl.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { Layer, LayerKey, LayerSectionKey } from 'meta/geo'

import { useAppDispatch } from 'client/store'
import { GeoActions, useGeoLayer } from 'client/store/ui/geo'
import InputRadio from 'client/components/Inputs/InputRadio'
import { useFetchNewLayerOption } from 'client/pages/Geo/GeoMap/hooks'

type Props = {
  layer: Layer
  layerKey: LayerKey
  sectionKey: LayerSectionKey
}

const TreeCoverPercentControl: React.FC<Props> = (props) => {
  const { layer, layerKey, sectionKey } = props

  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const layerState = useGeoLayer(sectionKey, layerKey)
  useFetchNewLayerOption(sectionKey, layerKey, 'gteTreeCoverPercent', layer)

  const handlePercentageChange = (percentage: number) => {
    dispatch(GeoActions.setLayerGteTreeCoverPercent({ sectionKey, layerKey, gteTreeCoverPercent: percentage }))
  }

  return (
    <div className="geo-tree-cover-percentage__container">
      <p>{t('geo.selectMinTreeCoverPercent')}</p>
      <div className="geo-tree-cover-percentage__radio-buttons-container">
        {layer.options?.gteTreeCoverPercent.map((percentage) => {
          const id = `${sectionKey}-${layerKey}-${percentage}`
          return (
            <div className="geo-tree-cover-percentage__radio-button" key={id}>
              <InputRadio
                checked={layerState?.options?.gteTreeCoverPercent === percentage}
                id={id}
                onChange={() => handlePercentageChange(percentage)}
                value={percentage}
              />
              <label htmlFor={id} key={id}>
                {`${percentage} %`}
              </label>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TreeCoverPercentControl