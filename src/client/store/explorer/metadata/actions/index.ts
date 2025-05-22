import { ExplorerFilterSlice } from 'client/store/explorer/filter/slice'

import { getMetadata } from './getMetadata'

export const ExplorerMetadataActions = {
  ...ExplorerFilterSlice.actions,
  getMetadata,
}
