import { combineSlices } from '@reduxjs/toolkit'

import { ExplorerDataSlice } from 'client/store/explorer/data/slice'
import { ExplorerMetadataSlice } from 'client/store/explorer/metadata/slice'
import { ExplorerSelectionSlice } from 'client/store/explorer/selection/slice'

export const ExplorerSlice = combineSlices(ExplorerDataSlice, ExplorerMetadataSlice, ExplorerSelectionSlice)
