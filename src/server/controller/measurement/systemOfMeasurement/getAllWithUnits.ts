import { SystemOfMeasurementWithUnits } from 'meta/measurement/systemOfMeasurement/systemOfMeasurement'

import { BaseProtocol, DB } from 'server/db'
import { SystemOfMeasurementRepository } from 'server/repository/measurement/systemOfMeasurement'
import { UnitRepository } from 'server/repository/measurement/unit'

export const getAllWithUnits = async (client: BaseProtocol = DB): Promise<Array<SystemOfMeasurementWithUnits>> => {
  const systemsOfMeasurement = await SystemOfMeasurementRepository.getAll(client)
  const units = await UnitRepository.getAll(client)

  return systemsOfMeasurement.map((system) => {
    const systemUnitUuids = new Set(Object.keys(system.conversionFactors))

    const filteredUnits = units.filter((u) => systemUnitUuids.has(u.uuid))

    const unitsRecord = filteredUnits.reduce<SystemOfMeasurementWithUnits['units']>((acc, u) => {
      acc[u.uuid] = { name: u.name, symbol: u.symbol }
      return acc
    }, {})

    return {
      ...system,
      units: unitsRecord,
    }
  })
}
