import { ExplorerDataSlice } from 'client/store/explorer/data/slice'

import { getData } from './getData'

export const ExplorerDataActions = {
  ...ExplorerDataSlice.actions,
  getData,
}
