import { Objects } from 'utils/objects'

import { SystemOfMeasurementDB } from 'meta/measurement/systemOfMeasurement'

import { BaseProtocol, DB } from 'server/db/db'

type Props = Omit<SystemOfMeasurementDB, 'uuid'>

export const create = (props: Props, client: BaseProtocol = DB): Promise<SystemOfMeasurementDB> => {
  const { baseUnitUUID, conversionFactors, name } = props

  return client.one<SystemOfMeasurementDB>(
    `
    insert into measurement.system_of_measurement (
      name,
      conversion_factors,
      base_unit_uuid
    ) values ($1, $2::jsonb, $3) 
    returning *;
    `,
    [name, JSON.stringify(conversionFactors), baseUnitUUID],
    Objects.camelize
  )
}
