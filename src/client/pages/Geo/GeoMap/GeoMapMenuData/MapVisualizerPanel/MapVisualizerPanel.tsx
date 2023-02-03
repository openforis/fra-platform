import './MapVisualizerPanel.scss'
import React from 'react'

import { ForestSource } from '@meta/geo'
import { forestAgreementRecipes } from '@meta/geo/forest'

import { useAppDispatch } from '@client/store'
import { GeoActions, useForestSourceOptions } from '@client/store/ui/geo'

import GeoMapMenuListElement from '../../GeoMapMenuListElement'
import AgreementLevelsControl from '../MapVisualizerAgreementLevelsControl'
import LayerOptionsPanel from './LayerOptionsPanel'
import { layers } from '.'

const RecipeSelector: React.FC = () => {
  const dispatch = useAppDispatch()
  const forestOptions = useForestSourceOptions()

  return (
    <div>
      <p>Recipes</p>
      <select
        value={forestOptions.recipe}
        onChange={(e) => {
          dispatch(GeoActions.setRecipe(e.target.value))
        }}
      >
        <option value="custom">custom</option>
        {forestAgreementRecipes.map((recipe) => (
          <option key={recipe.forestAreaDataProperty} value={recipe.forestAreaDataProperty}>
            {recipe.forestAreaDataProperty}
          </option>
        ))}
      </select>
    </div>
  )
}

const MapVisualizerPanel: React.FC = () => {
  const dispatch = useAppDispatch()
  const forestOptions = useForestSourceOptions()

  const toggleForestLayer = (key: ForestSource) => {
    dispatch(GeoActions.setRecipe('custom'))
    dispatch(GeoActions.toggleForestLayer(key))
  }

  return (
    <div className="geo-map-menu-data-visualizer-panel">
      <RecipeSelector />
      <p>Forest Layers</p>
      <div className="geo-map-menu-data-visualizer-panel-layers">
        {layers.map((layer, index) => {
          const isLayerChecked = forestOptions.selected.includes(layer.key)
          return (
            <div key={layer.key}>
              <GeoMapMenuListElement
                title={layer.title}
                tabIndex={index * -1 - 1}
                checked={isLayerChecked}
                onCheckboxClick={() => toggleForestLayer(layer.key)}
                backgroundColor={layer.key.toLowerCase()}
              >
                <LayerOptionsPanel layerKey={layer.key} checked={isLayerChecked} />
              </GeoMapMenuListElement>
            </div>
          )
        })}
        <AgreementLevelsControl />
      </div>
      <div className="geo-map-menu-data-container-btn">
        <button type="button" className="btn btn-secondary geo-map-menu-data-btn-recipe">
          Save Recipe
        </button>
        <button type="button" className="btn btn-primary geo-map-menu-data-btn-display">
          Display
        </button>
      </div>
    </div>
  )
}

export default MapVisualizerPanel
