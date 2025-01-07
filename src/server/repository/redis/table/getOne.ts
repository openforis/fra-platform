import { Assessment, Cycle, Table, TableName, TableSection } from 'meta/assessment'

import { SectionRedisRepository } from 'server/repository/redis/section'

type Props = {
  assessment: Assessment
  cycle: Cycle
  tableName: TableName
}

const findTable = (tableSections: Array<TableSection>, tableName: TableName): Table => {
  for (let i = 0; i < tableSections.length; i += 1) {
    const table = tableSections[i].tables.find((table) => table.props.name === tableName)
    if (table) return table
  }
  return undefined
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
    const table = findTable(sectionsMetadata[sectionName], tableName)
    return table ?? acc
  }, undefined)
}
