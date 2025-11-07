import { getOne } from 'server/db/repository/geo/forestEstimations/getOne'
import { upsert } from 'server/db/repository/geo/forestEstimations/upsert'

export const ForestEstimationsRepository = {
  upsert,
  getOne,
}
