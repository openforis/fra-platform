import { getOne } from 'server/repository/geo/forestEstimations/getOne'
import { upsert } from 'server/repository/geo/forestEstimations/upsert'

export const ForestEstimationsRepository = {
  upsert,
  getOne,
}
