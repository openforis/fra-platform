import { createMaterializedView } from './createMaterializedView'
import { dropMaterializedView } from './dropMaterializedView'
import { getCount } from './getCount'
import { getMany } from './getMany'
import { getOneOrNone } from './getOneOrNone'
import { refreshMaterializedView } from './refreshMaterializedView'

export const CountrySummaryRepository = {
  createMaterializedView,
  dropMaterializedView,
  getCount,
  getMany,
  getOneOrNone,
  refreshMaterializedView,
}
