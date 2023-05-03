// import './CustomAssetControl.scss'
// import React, { ChangeEvent, useState } from 'react'

// import classNames from 'classnames'

// import { LayerStatus, ProtectedAreaKey } from 'meta/geo'

// import { useAppDispatch } from 'client/store'
// import { GeoActions, useProtectedAreasOptions } from 'client/store/ui/geo'

// import ProtectedAreasLayerOptionsPanel from '../ProtectedAreasLayerOptionsPanel'

// const CustomAssetControl: React.FC = () => {
//   const dispatch = useAppDispatch()
//   const protectedAreasOptions = useProtectedAreasOptions()

//   const [inputValue, setInputValue] = useState<string>(
//     protectedAreasOptions.customAssetId ? protectedAreasOptions.customAssetId : ''
//   )
//   const [inputError, setInputError] = useState(false)

//   const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
//     setInputValue(event.target.value)
//     if (inputError && event.target.value.trim() !== '') {
//       setInputError(false)
//     }
//   }

//   const handleSubmit = (): void => {
//     if (inputValue.trim() === '') {
//       setInputError(true)
//     } else {
//       setInputError(false)
//       dispatch(GeoActions.setCustomProtectedAreaAssetId(inputValue.trim()))
//       dispatch(GeoActions.resetSingleProtectedAreaLayerStates(ProtectedAreaKey.CustomPA))
//     }
//   }

//   const toggleCustomLayer = () => {
//     dispatch(GeoActions.toggleProtectedAreaLayer(ProtectedAreaKey.CustomPA))
//   }

//   const isLayerChecked = protectedAreasOptions.selected.includes(ProtectedAreaKey.CustomPA)

//   let loadingStatus = null
//   if (protectedAreasOptions.pendingLayers[ProtectedAreaKey.CustomPA] !== undefined) loadingStatus = LayerStatus.loading
//   if (protectedAreasOptions.fetchedLayers[ProtectedAreaKey.CustomPA] !== undefined) loadingStatus = LayerStatus.ready
//   if (protectedAreasOptions.failedLayers[ProtectedAreaKey.CustomPA] !== undefined) loadingStatus = LayerStatus.failed

//   let checkBoxContent = null
//   if (loadingStatus === LayerStatus.loading) {
//     checkBoxContent = <div className="loading-spinner" />
//   } else if (loadingStatus === LayerStatus.failed) {
//     checkBoxContent = <div className={classNames('fra-checkbox', 'failed')} />
//   } else {
//     checkBoxContent = <div className={classNames('fra-checkbox', { checked: isLayerChecked })} />
//   }

//   return (
//     <>
//       <div className="custom-asset-list-element">
//         <div className="custom-asset-item-title">
//           <div
//             className="custom-asset-list-element-checkbox"
//             role="checkbox"
//             aria-checked={isLayerChecked}
//             tabIndex={0}
//             onClick={() => toggleCustomLayer()}
//             onKeyDown={() => toggleCustomLayer()}
//           >
//             {checkBoxContent}
//           </div>
//           <div className="custom-input-container">
//             <input
//               type="text"
//               value={inputValue}
//               onChange={handleInputChange}
//               placeholder="Asset ID"
//               style={{ border: inputError ? '1px solid red' : 'none' }}
//             />
//             <button type="button" className="btn-primary" onClick={handleSubmit}>
//               Submit
//             </button>
//           </div>
//         </div>
//         <ProtectedAreasLayerOptionsPanel layerKey={ProtectedAreaKey.CustomPA} checked={isLayerChecked} />
//       </div>
//       <div className="custom-asset-list-element-bottom" />
//     </>
//   )
// }

// export default CustomAssetControl
