import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { SectionName } from 'meta/assessment/section'
import { ExplorerMetadata } from 'meta/explorer/metadata'

import { BaseProtocol, DB } from 'server/db'
import { DimensionRepository } from 'server/repository/measurement/dimension'
import { MeasureRepository } from 'server/repository/measurement/measure'
import { getKeyCycle, Keys } from 'server/repository/redis/keys'
import { RedisData } from 'server/repository/redis/redisData'
import { SectionRedisRepository } from 'server/repository/redis/section/index'

const areaBasedTables = [
  'areaAffectedByFire',
  'areaOfPermanentForestEstate',
  'disturbances',
  'extentOfForest',
  'forestAreaWithinProtectedAreas',
  'forestOwnership',
  'holderOfManagementRights',
  'otherLandWithTreeCover',
  'primaryDesignatedManagementObjective',
  'specificForestCategories',
  'sustainableDevelopment15_2_1_5',
  // 'totalAreaWithDesignatedManagementObjective',
]

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
    const sectionsMetadata = await SectionRedisRepository.getManyMetadata(props, client)

    const jobs = Object.entries(sectionsMetadata).map(async ([sectionName, tableSections]) => {
      // Cache only one area based table per section
      const allSectionTables = tableSections.flatMap((ts) => ts.tables)

      const table = allSectionTables.find((t) => areaBasedTables.includes(t.props.name))
      if (!table) return

      const tableName = table.props.name

      const [measures, dimensions] = await Promise.all([
        MeasureRepository.getTableMeasures({ assessment, tableName }, client),
        DimensionRepository.getTableDimensions({ assessment, tableName }, client),
      ])

      const explorerMetadata: ExplorerMetadata = {
        dimensions,
        measures,
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
