import { createI18nPromise } from 'i18n/i18nFactory'
import { i18n as i18nType } from 'i18next'
import { Objects } from 'utils/objects'

import { Assessment, Cycle, Labels, Table } from 'meta/assessment'

import { MetadataController } from 'server/controller/metadata'

type Props = {
  assessment: Assessment
  cycle: Cycle
  tableName: string
  csvColumn: string
}

/**
 * Retrieves the unit label path for a given table name and cycle.
 *
 * @param {string} tableName - The name of the table.
 * @param {Cycle} cycle - The cycle.
 * @returns {string[]} An array representing the path to the unit in the metadata.
 */
const getUnitLabelPath = (tableName: string, cycle: Cycle): string[] => {
  const pathMap: Record<string, string[]> = {
    growingStockTotal: ['0', 'cols', '0', 'props', 'labels', cycle.uuid],
    growingStockComposition2025: ['1', 'cols', '0', 'props', 'labels', cycle.uuid],
    carbonStockSoilDepth: ['0', 'cols', '0', 'props', 'labels', cycle.uuid],
  }

  // The unit label is found from the second column of the header row by default
  const defaultPath = ['0', 'cols', '1', 'props', 'labels', cycle.uuid]
  return pathMap[tableName] || defaultPath
}

/**
 * Retrieves the table metadata for a given assessment, cycle, and table name.
 *
 * @param {Object} props - The properties object.
 * @param {Assessment} props.assessment - Assessment
 * @param {Cycle} props.cycle - Cycle
 * @param {string} props.tableName - Table name
 *
 * @returns {Promise<Table|undefined>} A promise that resolves to the table metadata or undefined if not found.
 */

const getTable = async (props: Props): Promise<Table | undefined> => {
  const { assessment, cycle, tableName } = props
  const sectionsMetadata = await MetadataController.getSectionsMetadata({ assessment, cycle })
  const table = Object.keys(sectionsMetadata).reduce((acc, sectionName) => {
    const section = sectionsMetadata[sectionName].find((section) =>
      section.tables.find((table) => table.props.name === tableName)
    )
    if (section) {
      return section.tables.find((table) => table.props.name === tableName)
    }
    return acc
  }, undefined as Table)
  return table
}

/**
 * Retrieves the metadata for a given table name and cycle.
 *
 * @param {Object} props - The properties object.
 * @param {Assessment} props.assessment - Assessment.
 * @param {Cycle} props.cycle - Cycle
 * @param {string} props.tableName - The name of the table.
 *
 * @returns {Promise<{ dateExported: string, unit: string }>} Metadata.
 */
export const getMetadata = async (
  props: Props
): Promise<{
  dateExported: string
  unit: string
}> => {
  const { cycle, tableName } = props

  const table = await getTable(props)
  const { rows } = table

  const i18n = (await createI18nPromise('en')) as i18nType
  const dateOfExport = `(${i18n.t('bulkDownload.dateOfExport')})`
  const dateExported = `${new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })} ${dateOfExport}`

  const label = Objects.getInPath(rows, getUnitLabelPath(tableName, cycle))
  const unit = label ? i18n.t(Labels.getLabel({ label, t: i18n.t })) : i18n.t(`unit.${table.props.unit}`)

  return { dateExported, unit }
}
