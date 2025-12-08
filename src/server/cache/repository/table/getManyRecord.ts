import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { RecordTables } from 'meta/assessment/table/record'

import { SectionRedisRepository } from 'server/cache/repository/section'

type Props = {
  assessment: Assessment
  cycle: Cycle
}

/**
 * Returns a Record<TableName, Table> for the given assessment / cycle
 *
 */

export const getManyRecord = async (props: Props): Promise<RecordTables> => {
  const { assessment, cycle } = props

  const sectionsMetadata = await SectionRedisRepository.getManyMetadata({ assessment, cycle })

  return Object.values(sectionsMetadata).reduce<RecordTables>((acc, tableSections) => {
    tableSections.forEach((tableSection) => {
      tableSection.tables.forEach((table) => {
        acc[table.props.name] = table
      })
    })
    return acc
  }, {})
}
