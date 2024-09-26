import { Assessment, Cycle, Table, TableName } from 'meta/assessment'

import { SectionRedisRepository } from 'server/repository/redis/section'

type Props = {
  assessment: Assessment
  cycle: Cycle
  tableName: TableName
}

/**
 * Retrieves the table metadata from redis for a given assessment, cycle, and table name.
 *
 * @param {Object} props - The properties object.
 * @param {Assessment} props.assessment - Assessment
 * @param {Cycle} props.cycle - Cycle
 * @param {string} props.tableName - Table name
 *
 * @returns {Promise<Table|undefined>} A promise that resolves to the table metadata or undefined if not found.
 */

export const getOne = async (props: Props): Promise<Table | undefined> => {
  const { assessment, cycle, tableName } = props
  const sectionsMetadata = await SectionRedisRepository.getManyMetadata({ assessment, cycle })
  return Object.keys(sectionsMetadata).reduce<Table | undefined>((acc, sectionName) => {
    const section = sectionsMetadata[sectionName].find((section) =>
      section.tables.find((table) => table.props.name === tableName)
    )
    if (section) {
      return section.tables.find((table) => table.props.name === tableName)
    }
    return acc
  }, undefined)
}
