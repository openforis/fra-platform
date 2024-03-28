import React from 'react'

import { Layer, LayerControlType, LayerSectionKey } from 'meta/geo/layer'

import AgreementLevelControl from 'client/components/Navigation/NavGeo/Layer/AgreementLevelControl'
import CustomAssetControl from 'client/components/Navigation/NavGeo/Layer/CustomAssetControl'
import TreeCoverPercentControl from 'client/components/Navigation/NavGeo/Layer/TreeCoverPercentControl'
import YearControl from 'client/components/Navigation/NavGeo/Layer/YearControl'

export const ControlComponents: {
  [key in LayerControlType]?: React.FC<{ layer: Layer; sectionKey: LayerSectionKey }>
} = {
  [LayerControlType.Agreement]: AgreementLevelControl,
  [LayerControlType.CustomAsset]: CustomAssetControl,
  [LayerControlType.TreeCoverPercent]: TreeCoverPercentControl,
  [LayerControlType.Year]: YearControl,
}
