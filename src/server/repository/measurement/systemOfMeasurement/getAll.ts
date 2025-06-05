import { SystemOfMeasurement } from 'meta/measurement/systemOfMeasurement'

import { BaseProtocol, DB } from 'server/db'
import { SystemOfMeasurementAdapter } from 'server/repository/adapter'

import { fieldsJoined } from './fields'

export const getAll = (client: BaseProtocol = DB): Promise<Array<SystemOfMeasurement>> => {
  return client.map<SystemOfMeasurement>(
    `
      select ${fieldsJoined('som')}
      from measurement.system_of_measurement som;
    `,
    [],
    SystemOfMeasurementAdapter
  )
}
