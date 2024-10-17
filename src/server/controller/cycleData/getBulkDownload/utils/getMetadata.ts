import { createI18nPromise } from 'i18n/i18nFactory'
import { i18n as i18nType } from 'i18next'
import { Objects } from 'utils/objects'

import { Assessment, Cycle, Labels } from 'meta/assessment'
import { Lang } from 'meta/lang'

import { TableRedisRepository } from 'server/repository/redis/table'

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
    growingStockComposition2025: ['1', 'cols', '0', 'props', 'labels', cycle.uuid],
    carbonStockSoilDepth: ['0', 'cols', '0', 'props', 'labels', cycle.uuid],
  }

  // The unit label is found from the second column of the header row by default
  const defaultPath = ['0', 'cols', '1', 'props', 'labels', cycle.uuid]
  return pathMap[tableName] || defaultPath
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

  const table = await TableRedisRepository.getOne(props)
  const { rows } = table

  const i18n = (await createI18nPromise(Lang.en)) as i18nType
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
