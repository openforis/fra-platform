// import './ForestLayerSection.scss'
// import React from 'react'

// import { ForestKey, LayerStatus } from '@meta/geo'
// import { forestAgreementRecipes } from '@meta/geo/forest'

// import { useAppDispatch } from '@client/store'
// import { GeoActions, useForestSourceOptions } from '@client/store/ui/geo'

// import GeoMapMenuListElement from '../../../GeoMapMenuListElement'
// import AgreementLevelsControl from '../../MapVisualizerAgreementLevelsControl'
// import LayerOptionsPanel from '../LayerOptionsPanel'
// import { forestLayers, GLOBAL_OPACITY_KEY } from '../layers'
// import CustomAssetControl from './CustomAssetControl'

// const RecipeSelector: React.FC = () => {
//   const dispatch = useAppDispatch()
//   const forestOptions = useForestSourceOptions()

//   return (
//     <div>
//       <p className="geo-map-menu-data-recipe-selector-title">Recipes</p>
//       <select
//         value={forestOptions.recipe}
//         onChange={(e) => {
//           dispatch(GeoActions.setForestLayersRecipe(e.target.value))
//         }}
//       >
//         <option value="custom">custom</option>
//         {forestAgreementRecipes.map((recipe) => (
//           <option key={recipe.forestAreaDataProperty} value={recipe.forestAreaDataProperty}>
//             {recipe.recipeLabel}
//           </option>
//         ))}
//       </select>
//     </div>
//   )
// }

// const ForestLayerSection: React.FC = () => {
//   const dispatch = useAppDispatch()
//   const forestOptions = useForestSourceOptions()
//   const toggleForestLayer = (key: ForestKey) => {
//     dispatch(GeoActions.setForestLayersRecipe('custom'))
//     dispatch(GeoActions.toggleForestLayer(key))
//   }

//   return (
//     <div className="geo-map-menu-data-visualizer-panel">
//       <RecipeSelector />
//       <div className="geo-map-menu-data-visualizer-panel-layers">
//         <div key={GLOBAL_OPACITY_KEY}>
//           <GeoMapMenuListElement title="Global Opacity" tabIndex={0}>
//             <LayerOptionsPanel layerKey={GLOBAL_OPACITY_KEY} checked />
//           </GeoMapMenuListElement>
//         </div>
//         {forestLayers.map((layer) => {
//           if (layer.key === ForestKey.CustomFnF) return false
//           const isLayerChecked = forestOptions.selected.includes(layer.key)
//           let status = null
//           if (forestOptions.pendingLayers[layer.key] !== undefined) status = LayerStatus.loading
//           if (forestOptions.fetchedLayers[layer.key] !== undefined) status = LayerStatus.ready
//           if (forestOptions.failedLayers[layer.key] !== undefined) status = LayerStatus.failed
//           // If the status continues to be null, it means it has not been attempted to fetch the layer
//           return (
//             <div key={layer.key}>
//               <GeoMapMenuListElement
//                 title={layer.title}
//                 tabIndex={0}
//                 checked={isLayerChecked}
//                 onCheckboxClick={() => toggleForestLayer(layer.key)}
//                 backgroundColor={layer.key.toLowerCase()}
//                 loadingStatus={status}
//               >
//                 <LayerOptionsPanel layerKey={layer.key} checked={isLayerChecked} />
//               </GeoMapMenuListElement>
//             </div>
//           )
//         })}
//         <CustomAssetControl />
//         <AgreementLevelsControl />
//       </div>
//       {/*
//       // The following code is commented out because the buttons are not functional yet.
//       <div className="geo-map-menu-data-container-btn">
//         <button type="button" className="btn btn-secondary geo-map-menu-data-btn-recipe">
//           Save Recipe
//         </button>
//         <button type="button" className="btn btn-primary geo-map-menu-data-btn-display">
//           Display
//         </button>
//       </div> */}
//     </div>
//   )
// }

// export default ForestLayerSection
