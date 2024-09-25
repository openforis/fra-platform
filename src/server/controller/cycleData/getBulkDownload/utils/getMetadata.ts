import { createI18nPromise } from 'i18n/i18nFactory'
import { i18n as i18nType } from 'i18next'
import { Objects } from 'utils/objects'

import { Assessment, Cycle, Labels, RowType } from 'meta/assessment'

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
 * Retrieves the row type for a given table name.
 *
 * @param {string} tableName - The name of the table.
 * @returns {RowType} The row type for the given table.
 */
const getRowType = (tableName: string): RowType => {
  const rowTypeMap: Record<string, RowType> = {
    carbonStockSoilDepth: RowType.data,
  }

  return rowTypeMap[tableName] || RowType.header
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
  const { assessment, cycle, tableName } = props

  const table = await MetadataController.getTable({ assessment, cycle, tableName })
  const rows = await MetadataController.getRows({
    assessment,
    tableName,
    cycle,
    includeCols: true,
    rowType: getRowType(tableName), // Use the new getRowType function here
  })

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
