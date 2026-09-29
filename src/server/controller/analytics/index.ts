import { AnalyticsRepository } from 'server/db/repository/analytics'

const { create, findAll } = AnalyticsRepository

export const AnalyticsController = {
  create,
  findAll,
}
