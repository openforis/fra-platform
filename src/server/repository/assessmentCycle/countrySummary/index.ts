import { createMaterializedView } from './createMaterializedView'
import { getCount } from './getCount'
import { getMany } from './getMany'
import { refreshMaterializedView } from './refreshMaterializedView'

export const CountrySummaryRepository = {
  createMaterializedView,
  getCount,
  getMany,
  refreshMaterializedView,
}
