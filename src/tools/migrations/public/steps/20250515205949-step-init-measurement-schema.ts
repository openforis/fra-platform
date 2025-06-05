import { Objects } from 'utils/objects'

import { SystemOfMeasurementName, systemsOfMeasurement } from 'meta/measurement/systemOfMeasurement'
import { UUID } from 'meta/uuid'

import { BaseProtocol, DB } from 'server/db'
import { SystemOfMeasurementRepository } from 'server/repository/measurement/systemOfMeasurement'
import { UnitRepository } from 'server/repository/measurement/unit'
import { DDL } from 'server/repository/public/ddl'
import { Logger } from 'server/utils/logger'

const client: BaseProtocol = DB

export default async () => {
  // 0. Avoid re-running
  const { exists } = await client.one<{ exists: boolean }>(
    `select exists(select 1 from information_schema.schemata where schema_name = 'measurement') as exists;`
  )
  if (exists) {
    Logger.info('Measurement schema already initialized')
    return
  }

  // 1. Create measurement schema and tables
  await client.query(DDL.getCreateMeasurementSchemaDDL())

  // 2. Insert units and system of measurements
  const insertTasks = Object.entries(systemsOfMeasurement).map(async ([systemOfMeasurementName, system]) => {
    Logger.info(`Inserting ${system.units.length} units for system "${systemOfMeasurementName}"…`)

    const dbUnits = await UnitRepository.massiveInsert({ units: system.units }, client)

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

    Logger.info(`Inserting system of measurement "${systemOfMeasurementName}"…`)
    await SystemOfMeasurementRepository.create(
      {
        baseUnitUUID: dbBaseUnit.uuid,
        conversionFactors,
        name: systemOfMeasurementName as SystemOfMeasurementName,
      },
      client
    )
  })

  await Promise.all(insertTasks)

  Logger.info('Measurement schema initialized')
}
