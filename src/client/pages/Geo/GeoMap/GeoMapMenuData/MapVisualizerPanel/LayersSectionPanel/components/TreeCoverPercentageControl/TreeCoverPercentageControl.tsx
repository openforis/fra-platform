import './TreeCoverPercentageControl.scss'
import React from 'react'

import { Layer, LayerKey, LayerSectionKey } from 'meta/geo'

import { useAppDispatch } from 'client/store'
import { GeoActions } from 'client/store/ui/geo'
import { LayerState } from 'client/store/ui/geo/stateType'
import { useFetchNewLayerOption } from 'client/pages/Geo/GeoMap/hooks'

interface Props {
  sectionKey: LayerSectionKey
  layerKey: LayerKey
  layer: Layer
  layerState: LayerState
}
const TreeCoverPercentageControl: React.FC<Props> = ({ sectionKey, layerKey, layerState, layer }) => {
  const dispatch = useAppDispatch()

  useFetchNewLayerOption(sectionKey, layerKey, 'gteTreeCoverPercent')

  const handlePercentageChange = (percentage: number) => {
    dispatch(GeoActions.setLayerGteTreeCoverPercent({ sectionKey, layerKey, gteTreeCoverPercent: percentage }))
  }

  return (
    <div className="geo-map-menu-tree-cover-inputs ">
      <div>
        <div>
          <p>Select min. tree cover percentage:</p>
          <fieldset>
            {layer.options?.gteTreeCoverPercent.map((percentage) => {
              const id = `${sectionKey}-${layerKey}-${percentage}`
              return (
                <label htmlFor={id} key={id}>
                  <input
                    type="radio"
                    checked={layerState?.options?.gteTreeCoverPercent === percentage}
                    id={id}
                    onChange={() => handlePercentageChange(percentage)}
                  />
                  <small>{percentage} %</small>
                </label>
              )
            })}
          </fieldset>
        </div>
      </div>
    </div>
  )
}

export default TreeCoverPercentageControl
