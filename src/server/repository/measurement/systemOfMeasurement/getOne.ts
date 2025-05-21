import { Objects } from 'utils/objects'

import { SystemOfMeasurement, SystemOfMeasurementName } from 'meta/measurement/systemOfMeasurement'

import { BaseProtocol, DB } from 'server/db'

type Props = {
  systemOfMeasurementName: SystemOfMeasurementName
}

export const getOne = (props: Props, client: BaseProtocol = DB): Promise<SystemOfMeasurement> => {
  const { systemOfMeasurementName } = props

  return client.one<SystemOfMeasurement>(
    `
      select som.*
      from measurement.system_of_measurement som
      where som.name = $1;
    `,
    [systemOfMeasurementName],
    (measure) => Objects.camelize(measure)
  )
}
