import { createMaterializedView } from './createMaterializedView'
import { dropMaterializedView } from './dropMaterializedView'
import { getCount } from './getCount'
import { getMany } from './getMany'
import { refreshMaterializedView } from './refreshMaterializedView'

export const CountryActivityLogRepository = {
  createMaterializedView,
  dropMaterializedView,
  getCount,
  getMany,
  refreshMaterializedView,
}
