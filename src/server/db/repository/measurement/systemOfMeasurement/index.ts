import { create } from 'server/db/repository/measurement/systemOfMeasurement/create'
import { getAll } from 'server/db/repository/measurement/systemOfMeasurement/getAll'
import { getOne } from 'server/db/repository/measurement/systemOfMeasurement/getOne'

export const SystemOfMeasurementRepository = {
  create,
  getAll,
  getOne,
}
