// import './BurnedAreasLayerOptionsPanel.scss'
// import React, { useState } from 'react'
// import { batch } from 'react-redux'

// import { BurnedAreaKey } from 'meta/geo'

// import { useAppDispatch } from 'client/store'
// import { GeoActions, useBurnedAreasOptions, useIsGeoMapAvailable } from 'client/store/ui/geo'
// import { mapController } from 'client/utils'

// import { GLOBAL_OPACITY_KEY } from '../..'

// interface Props {
//   layerKey: string
//   checked: boolean
// }

// const BurnedAreasLayerOptionsPanel: React.FC<Props> = ({ layerKey, checked }) => {
//   const dispatch = useAppDispatch()
//   const burnedAreasOptions = useBurnedAreasOptions()
//   const isMapAvailable = useIsGeoMapAvailable()
//   const isLayerEnabled = checked && isMapAvailable
//   const opacity = burnedAreasOptions.opacity[layerKey] !== undefined ? burnedAreasOptions.opacity[layerKey] : 1
//   const [globalOpacity, setGlobalOpacity] = useState(0.5)

//   const years = Array(burnedAreasOptions.applied.endYear - burnedAreasOptions.applied.startYear + 1)
//     .fill(burnedAreasOptions.applied.startYear)
//     .map((_, i) => burnedAreasOptions.applied.startYear + i)

//   const handleOpacityChange = (event: React.FormEvent<HTMLInputElement>) => {
//     const newValue = Math.round(Number(event.currentTarget.value) / 10) / 10
//     dispatch(GeoActions.setBurnedAreaLayerOpacity({ key: layerKey, opacity: newValue }))
//     mapController.setEarthEngineLayerOpacity(layerKey, newValue)
//   }

//   const handleGlobalOpacityChange = (event: React.FormEvent<HTMLInputElement>) => {
//     const newGlobalOpacityValue = Math.round(Number(event.currentTarget.value) / 10) / 10
//     setGlobalOpacity(newGlobalOpacityValue)
//     burnedAreasOptions.selected.forEach((layerKey) =>
//       mapController.setEarthEngineLayerOpacity(layerKey, newGlobalOpacityValue)
//     )
//     dispatch(GeoActions.setBurnedAreaGlobalOpacity(newGlobalOpacityValue))
//   }

//   const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     batch(() => {
//       dispatch(GeoActions.setBurnedAreasSelectedYear(Number(event.target.value)))
//       dispatch(GeoActions.applyBurnedAreasUIOptions())
//     })
//   }

//   return (
//     <>
//       <div className="geo-map-menu-forest-layer-opacity-input">
//         <div className="geo-map-menu-forest-layer-opacity-input-div">
//           <input
//             type="range"
//             min="0"
//             max="100"
//             value={(layerKey === GLOBAL_OPACITY_KEY ? globalOpacity : opacity) * 100}
//             onChange={layerKey === GLOBAL_OPACITY_KEY ? handleGlobalOpacityChange : handleOpacityChange}
//             disabled={!isLayerEnabled}
//           />{' '}
//         </div>
//         <div className="geo-map-menu-burned-area-layer-opacity-percentage-div">
//           <small>{`${(layerKey === GLOBAL_OPACITY_KEY ? globalOpacity : opacity) * 100}%`}</small>
//         </div>
//       </div>
//       {layerKey === BurnedAreaKey.MODIS && isLayerEnabled ? (
//         <div className="burned-area-year-selector-container">
//           <p>Select a year</p>
//           <select
//             className="burned-area-year-selector"
//             value={burnedAreasOptions.ui.selectedYear}
//             onChange={handleYearChange}
//           >
//             {years.map((year) => (
//               <option key={year}>{year}</option>
//             ))}
//           </select>
//         </div>
//       ) : null}
//     </>
//   )
// }

// export default BurnedAreasLayerOptionsPanel
