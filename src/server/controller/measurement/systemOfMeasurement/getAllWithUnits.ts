import { SystemOfMeasurement } from 'meta/measurement/systemOfMeasurement/systemOfMeasurement'

import { BaseProtocol, DB } from 'server/db'
import { SystemOfMeasurementRepository } from 'server/repository/measurement/systemOfMeasurement'
import { UnitRepository } from 'server/repository/measurement/unit'

export const getAllWithUnits = async (client: BaseProtocol = DB): Promise<Array<SystemOfMeasurement>> => {
  const systemsOfMeasurement = await SystemOfMeasurementRepository.getAll(client)
  const units = await UnitRepository.getAll(client)

  return systemsOfMeasurement.map((system) => {
    const baseUnit = units.find((u) => u.uuid === system.baseUnitUUID)

    const systemUnitUuids = new Set(Object.keys(system.conversionFactors))

    const filteredUnits = units.filter((u) => systemUnitUuids.has(u.uuid))

    const unitsRecord = filteredUnits.reduce<SystemOfMeasurement['units']>((acc, unit) => {
      const { name, symbol } = unit
      const conversionFactor = system.conversionFactors[unit.uuid]

      acc[name] = {
        conversionFactor,
        name,
        symbol,
      }

      return acc
    }, {})

    return {
      baseUnitName: baseUnit.name,
      name: system.name,
      units: unitsRecord,
    }
  })
}
