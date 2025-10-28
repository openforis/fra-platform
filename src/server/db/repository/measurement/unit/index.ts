import { getAll } from 'server/db/repository/measurement/unit/getAll'
import { massiveInsert } from 'server/db/repository/measurement/unit/massiveInsert'

export const UnitRepository = {
  getAll,
  massiveInsert,
}
