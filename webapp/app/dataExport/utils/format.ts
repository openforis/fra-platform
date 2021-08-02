/**
 * This file contains formatting helpers for dataExport
 * Everything from table, column mappings to formatting received data and keys
 * "hotfix"
 */
import { AssessmentType } from '@core/assessment'
import * as NumberUtils from '@common/bignumberUtils'
import { Unit, UnitConverter, UnitFactors } from '@webapp/sectionSpec'
import { format } from 'date-fns'
import { getPanEuropeanTableMapping } from '@webapp/app/dataExport/utils/panEuropean'

export const regex = {
  yearRange: /\d{4}-\d{4}/,
  yearRangeUnderscore: /\d{4}_\d{4}/,
  yearWithWord: /\d{4}_\w{4}/,
}

export const isYearRange = (range: any) => regex.yearRange.test(range)
export const yearRangeToUnderscore = (range: any) => range.replace('-', '_')

export const isYearWithWord = (column: any) => regex.yearWithWord.test(column)
export const splitYearWithWord = (column: any) => column.split('_')

const columnI18nMappings: Record<string, string> = {
  common_name: 'commonName',
  scientific_name: 'scientificName',
  national: 'national',
  subnational: 'subnational',
}

export const getColumnLabel = (column: string, section: string): string =>
  columnI18nMappings[column] ? `${section}.${columnI18nMappings[column]}` : String(column)

/**
 * Returns the possible i18n mapping
 * @param column - column value
 * @param section - url params: current section
 * @param assessmentType - type, ex. fra2020 / panEuropean
 * @returns {array} - i18n keys
 */
export const getI18nKey = (column: any, section: any, assessmentType: AssessmentType) => {
  if (assessmentType === AssessmentType.panEuropean) {
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
export const forestPolicy: Record<string, string> = {
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
  base && base !== unit && Object.keys(UnitFactors).includes(base)
    ? UnitConverter.convertValue(value, base, unit)
    : value

const sections: any = {
  designatedManagementObjective: 'primary_designated_management_objective',
}

/**
 * Helper function to handle datamase mapping for table names
 * @param section
 * @param assessmentType
 * @returns {*}
 */
export const formatSection = (section: string, assessmentType: AssessmentType) => {
  if (assessmentType === AssessmentType.panEuropean) {
    return getPanEuropeanTableMapping(section)
  }
  return sections[section] ? sections[section] : section
}

/**
 * Get timestamp for today in given format or default YYYY-MM-DD
 * @param formatStr {string} - format string for
 * @returns {*} - return new timestamp
 */
export const getTimeStamp = (formatStr = 'yyyy-MM-dd') => format(new Date(), formatStr)

const variableI18nMappings: any = {
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
  return variableI18nMappings[key] ? variableI18nMappings[key] : i18nKey
}

const unitI18nMappings: Record<string, string> = {
  ha: 'ha',
  kmSq: 'kmSq',
  mileSq: 'mileSq',
  acre1000: 'acre1000',
  acre: 'acre',
  haMillion: 'haMillion',
  [Unit.haThousand]: Unit.haThousand,
}

export const getUnitI18nMappings = (unit: string): string =>
  unitI18nMappings[unit] ? `unit.${unitI18nMappings[unit]}` : unit
