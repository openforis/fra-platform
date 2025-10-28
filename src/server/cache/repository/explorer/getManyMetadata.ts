import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { SectionName } from 'meta/assessment/section'
import { TableName } from 'meta/assessment/table'
import { ExplorerMetadata } from 'meta/explorer/metadata'
import { SystemOfMeasurementName, systemsOfMeasurement } from 'meta/measurement/systemOfMeasurement'
import { SystemOfMeasurement } from 'meta/measurement/systemOfMeasurement/systemOfMeasurement'

import { BaseProtocol, DB } from 'server/db/db'
import { SystemOfMeasurementController } from 'server/controller/measurement/systemOfMeasurement'
import { getKeyCycle, Keys } from 'server/cache/repository/keys'
import { RedisData } from 'server/cache/repository/redisData'
import { SectionRedisRepository } from 'server/cache/repository/section'
import { DimensionRepository } from 'server/repository/measurement/dimension'
import { MeasureRepository } from 'server/repository/measurement/measure'

const skipTables = [
  'biomassStockTotal',
  'carbonStockTotal',
  'growingStockAvg',
  'totalAreaWithDesignatedManagementObjective',
]
const standaloneTables = ['growingStockComposition2025', 'forestPolicy']

type Props = {
  assessment: Assessment
  cycle: Cycle
  force?: boolean
  sectionNames?: Array<string>
}

type RecordExplorerMetadata = Record<SectionName, ExplorerMetadata>

export const getManyMetadata = async (props: Props, client: BaseProtocol = DB): Promise<RecordExplorerMetadata> => {
  const { assessment, cycle, force, sectionNames } = props

  const redis = RedisData.getInstance()
  const key = getKeyCycle({ assessment, cycle, key: Keys.Explorer.metadata })

  if (force) {
    await redis.del(key)
  }

  const length = await redis.hlen(key)

  if (length === 0) {
    const allSystemsTableNames = Object.values(systemsOfMeasurement).reduce<Array<TableName>>((acc, system) => {
      system.tableNames.forEach((tableName) => {
        if (!skipTables.includes(tableName) && !acc.includes(tableName)) {
          acc.push(tableName)
        }
      })
      return acc
    }, [])

    const [sectionsMetadata, systemsWithUnits] = await Promise.all([
      SectionRedisRepository.getManyMetadata(props, client),
      SystemOfMeasurementController.getAllWithUnits(client),
    ])

    const jobs = Object.entries(sectionsMetadata).map(async ([sectionName, tableSections]) => {
      const allSectionTables = tableSections.flatMap((ts) => ts.tables)

      const table = allSectionTables.find(
        (t) => allSystemsTableNames.includes(t.props.name) || standaloneTables.includes(t.props.name)
      )

      if (!table) return

      const tableName = table.props.name

      const [cellsExportAlways, dimensions, measures] = await Promise.all([
        MeasureRepository.getTableCellsExportAlways({ assessment, cycle, tableName }, client),
        DimensionRepository.getTableDimensions({ assessment, cycle, tableName }, client),
        MeasureRepository.getTableMeasures({ assessment, cycle, tableName }, client),
      ])

      const systemNames = [...new Set(measures.map((m) => m.systemName).filter(Boolean))]
      const systemsOfMeasurementRecord: Partial<Record<SystemOfMeasurementName, SystemOfMeasurement>> = {}

      systemNames.forEach((name) => {
        const system = systemsWithUnits.find((s) => s.name === name)
        if (system) systemsOfMeasurementRecord[system.name] = system
      })

      const explorerMetadata: ExplorerMetadata = {
        cellsExportAlways,
        dimensions,
        measures,
        systemsOfMeasurements: systemsOfMeasurementRecord,
        tableName,
      }
      await redis.hset(key, sectionName, JSON.stringify(explorerMetadata))
    })

    await Promise.all(jobs)
  }

  const keys = sectionNames ?? (await redis.hkeys(key))
  const values: Array<string> = await redis.hmget(key, ...keys)

  return keys.reduce<RecordExplorerMetadata>((acc, key, index) => ({ ...acc, [key]: JSON.parse(values[index]) }), {})
}
