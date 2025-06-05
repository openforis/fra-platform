import { SystemOfMeasurement } from 'meta/measurement/systemOfMeasurement'

import { BaseProtocol, DB } from 'server/db'
import { SystemOfMeasurementAdapter } from 'server/repository/adapter'

export const getAll = (client: BaseProtocol = DB): Promise<Array<SystemOfMeasurement>> => {
  return client.map<SystemOfMeasurement>(
    `
      select som.*
      from measurement.system_of_measurement som;
    `,
    [],
    SystemOfMeasurementAdapter
  )
}
