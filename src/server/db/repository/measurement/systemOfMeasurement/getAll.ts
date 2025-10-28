import { SystemOfMeasurementDB } from 'meta/measurement/systemOfMeasurement'

import { BaseProtocol, DB } from 'server/db/db'
import { SystemOfMeasurementAdapter } from 'server/db/repository/adapter'
import { fields } from 'server/db/repository/measurement/systemOfMeasurement/fields'
import { SQLs } from 'server/db/SQLs'

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
