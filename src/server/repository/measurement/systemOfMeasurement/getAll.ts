import { SystemOfMeasurementDB } from 'meta/measurement/systemOfMeasurement'

import { BaseProtocol, DB } from 'server/db/db'
import { SQLs } from 'server/db/SQLs'
import { SystemOfMeasurementAdapter } from 'server/repository/adapter'

import { fields } from './fields'

export const getAll = (client: BaseProtocol = DB): Promise<Array<SystemOfMeasurementDB>> => {
  return client.map<SystemOfMeasurementDB>(
    `
      select ${SQLs.fieldsJoined(fields, 'som')}
      from measurement.system_of_measurement som;
    `,
    [],
    SystemOfMeasurementAdapter
  )
}
