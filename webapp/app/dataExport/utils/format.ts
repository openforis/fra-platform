/**
 * This file contains formatting helpers for dataExport
 * Everything from table, column mappings to formatting received data and keys
 * "hotfix"
 */
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as NumberUtils from '@common/bignumberUtils'
import { UnitSpec } from '@webapp/app/assessment/components/section/sectionSpec'
import { format } from 'date-fns'
import { getPanEuropeanTableMapping } from '@webapp/app/dataExport/utils/panEuropean'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import { isTypePanEuropean } from '@common/assessment/assessment'

export const regex = {
  yearRange: /\d{4}-\d{4}/,
  yearRangeUnderscore: /\d{4}_\d{4}/,
  yearWithWord: /\d{4}_\w{4}/,
}

export const isYearRange = (range: any) => regex.yearRange.test(range)
export const yearRangeToUnderscore = (range: any) => range.replace('-', '_')

export const isYearWithWord = (column: any) => regex.yearWithWord.test(column)
export const splitYearWithWord = (column: any) => column.split('_')

const columnI18nMappings = {
  common_name: 'commonName',
  scientific_name: 'scientificName',
  national: 'national',
  subnational: 'subnational',
}

export const getColumnLabel = (column: any, section: any) =>
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  columnI18nMappings[column] ? `${section}.${columnI18nMappings[column]}` : String(column)

/**
 * Returns the possible i18n mapping
 * @param column - column value
 * @param section - url params: current section
 * @param assessmentType - type, ex. fra2020 / panEuropean
 * @returns {array} - i18n keys
 */
export const getI18nKey = (column: any, section: any, assessmentType: any) => {
  if (isTypePanEuropean(assessmentType)) {
    return [`${assessmentType}.${section}.${column}`]
  }

  if (isYearWithWord(column)) {
    const [year, word] = splitYearWithWord(column)
    return [year, `${section}.${word}`]
  }
  return [`${getColumnLabel(column, section)}`]
}

// View specific
// forestPolicy
export const forestPolicy = {
  national: 'national_yes_no',
  subnational: 'sub_national_yes_no',
  national_yes_no: 'national',
  sub_national_yes_no: 'subnational',
}

const isForestPolicySection = (section: any) => section.includes('forestPolicy')

/**
 * Helper function to map to correct database columns
 * @param column - column value
 * @param section - url params: current section
 * @returns {*}
 */
export const formatColumn = (column: any, section: any) => {
  // /forestPolicy/ has specific mappings
  if (isForestPolicySection(section)) {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    return forestPolicy[column]
  }

  if (isYearRange(column)) {
    return column.replace('-', '_')
  }
  return column
}

/**
 * Helper function to display received data correctly
 * @param {string} column - column value
 * @param {string} countryIso - selection country iso
 * @param {Object} results - result set to display in the table
 * @param {string} section - url params: current section
 * @returns {{columnKey: *, value: *}} - formatted column and value, from results
 */
export const getValue = (column: any, countryIso: any, results: any, section: any, variable: any) => {
  let columnKey = column

  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  if (isForestPolicySection(section)) columnKey = forestPolicy[column]
  if (isYearRange(column)) columnKey = yearRangeToUnderscore(column)

  let value =
    results && results[countryIso] && results[countryIso][variable] && results[countryIso][variable][columnKey]
  // Convert value to string and check if it's a number
  if (!Number.isNaN(+value)) value = NumberUtils.formatNumber(value)
  if (value === 'NaN') value = ''

  return { columnKey, value }
}

export const valueConverted = (value: any, base: any, unit: any) =>
  base && base !== unit && Object.keys(UnitSpec.factors).includes(base) ? UnitSpec.convert(value, base, unit) : value

const sections = {
  designatedManagementObjective: 'primary_designated_management_objective',
}

/**
 * Helper function to handle datamase mapping for table names
 * @param section
 * @param assessmentType
 * @returns {*}
 */
export const formatSection = (section: any, assessmentType: any) => {
  if (isTypePanEuropean(assessmentType)) {
    return getPanEuropeanTableMapping(section)
  }
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  return sections[section] ? sections[section] : section
}

/**
 * Get timestamp for today in given format or default YYYY-MM-DD
 * @param formatStr {string} - format string for
 * @returns {*} - return new timestamp
 */
export const getTimeStamp = (formatStr = 'yyyy-MM-dd') => format(new Date(), formatStr)

const variableI18nMappings = {
  other: 'common.other',
  otherOrUnknown: 'common.unknown',
}

/**
 * Some variable's might have custom mappings, check for the special cases and return accordingly
 * @param i18nKey - i18n key of format 'foo.bar' to check for custom mapping(s)
 * @returns {*} - return either the original i18nKey or new key from variableI18nMappings
 */
export const getCustomVariableI18nMappings = (i18nKey: any) => {
  // get the last part of the i18n key,
  // ex: foo.bar.other => other
  const key = i18nKey.split('.').pop()
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  return variableI18nMappings[key] ? variableI18nMappings[key] : i18nKey
}

const unitI18nMappings = {
  ha: 'ha',
  kmSq: 'kmSq',
  mileSq: 'mileSq',
  acre1000: 'acre1000',
  acre: 'acre',
  haMillion: 'haMillion',
  [UnitSpec.units.haThousand]: UnitSpec.units.haThousand,
}

export const getUnitI18nMappings = (unit: any) => (unitI18nMappings[unit] ? `unit.${unitI18nMappings[unit]}` : unit)
