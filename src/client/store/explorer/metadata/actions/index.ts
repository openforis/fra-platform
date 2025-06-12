import { ExplorerMetadataSlice } from 'client/store/explorer/metadata/slice'

import { getMetadata } from './getMetadata'

export const ExplorerMetadataActions = {
  ...ExplorerMetadataSlice.actions,
  getMetadata,
}
