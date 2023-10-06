import { createMaterializedView } from './createMaterializedView'
import { dropMaterializedView } from './dropMaterializedView'
import { getCount } from './getCount'
import { getLastEditOdpData } from './getLastEditOdpData'
import { getMany } from './getMany'
import { refreshMaterializedView } from './refreshMaterializedView'

export const CountrySummaryRepository = {
  createMaterializedView,
  dropMaterializedView,
  getCount,
  getLastEditOdpData,
  getMany,
  refreshMaterializedView,
}
