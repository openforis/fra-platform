import { SystemOfMeasurementDB, SystemOfMeasurementName } from 'meta/measurement/systemOfMeasurement'

import { BaseProtocol, DB } from 'server/db/db'
import { SQLs } from 'server/db/SQLs'
import { SystemOfMeasurementAdapter } from 'server/repository/adapter'

import { fields } from './fields'

type Props = {
  systemOfMeasurementName: SystemOfMeasurementName
}

export const getOne = (props: Props, client: BaseProtocol = DB): Promise<SystemOfMeasurementDB> => {
  const { systemOfMeasurementName } = props

  return client.one<SystemOfMeasurementDB>(
    `
      select ${SQLs.fieldsJoined(fields, 'som')}
      from measurement.system_of_measurement som
      where som.name = $1;
    `,
    [systemOfMeasurementName],
    SystemOfMeasurementAdapter
  )
}
