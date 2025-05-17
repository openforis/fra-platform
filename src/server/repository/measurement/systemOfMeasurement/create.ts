import { Objects } from 'utils/objects'

import { SystemOfMeasurement } from 'meta/measurement/systemOfMeasurement'

import { BaseProtocol, DB } from 'server/db'

type Props = Omit<SystemOfMeasurement, 'uuid'>

export const create = (props: Props, client: BaseProtocol = DB): Promise<SystemOfMeasurement> => {
  const { baseUnitUUID, conversionFactors, name } = props

  return client.one<SystemOfMeasurement>(
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
