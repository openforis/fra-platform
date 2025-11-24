import { Objects } from 'utils/objects'

import { SystemOfMeasurementName, systemsOfMeasurement } from 'meta/measurement/systemOfMeasurement'
import { UUID } from 'meta/uuid/uuid'

import { DB } from 'server/db/db'
import { SystemOfMeasurementRepository } from 'server/db/repository/measurement/systemOfMeasurement'
import { UnitRepository } from 'server/db/repository/measurement/unit'
import { DDL } from 'server/db/repository/public/ddl'
import { Logger } from 'server/utils/logger'

export const initMeasurement = async (): Promise<void> => {
  // 0. Avoid re-running
  const { exists } = await DB.one<{ exists: boolean }>(
    `select exists(select 1 from information_schema.schemata where schema_name = 'measurement') as exists;`
  )
  if (exists) {
    Logger.info('Measurement schema already initialized')
    return
  }

  // 1. Create measurement schema and tables
  await DB.query(DDL.getCreateMeasurementSchemaDDL())

  // 2. Insert units and system of measurements
  const insertTasks = Object.entries(systemsOfMeasurement).map(async ([systemOfMeasurementName, system]) => {
    const dbUnits = await UnitRepository.massiveInsert({ units: system.units })

    const baseUnit = system.units.find((u) => u.conversionFactor === 1)

    if (Objects.isEmpty(baseUnit)) {
      return
    }

    const { name: baseUnitName } = baseUnit
    const dbBaseUnit = dbUnits.find((u) => u.name === baseUnitName)

    const conversionFactors = dbUnits.reduce<Record<UUID, number>>((acc, dbUnit) => {
      const unitDef = system.units.find((u) => u.name === dbUnit.name)
      const conversionFactor = unitDef?.conversionFactor
      if (!Objects.isEmpty(conversionFactor)) {
        acc[dbUnit.uuid] = unitDef.conversionFactor
      }
      return acc
    }, {})

    await SystemOfMeasurementRepository.create({
      baseUnitUUID: dbBaseUnit.uuid,
      conversionFactors,
      name: systemOfMeasurementName as SystemOfMeasurementName,
    })
  })

  await Promise.all(insertTasks)

  Logger.info('Measurement schema initialized')
}
