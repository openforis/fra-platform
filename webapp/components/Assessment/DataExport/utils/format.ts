import { AssessmentType } from '@core/assessment'
import * as NumberUtils from '@core/utils/numbers'
import { Unit, UnitConverter, UnitFactors } from '@webapp/sectionSpec'

import { getPanEuropeanTableMapping } from '@webapp/components/Assessment/DataExport/utils/panEuropean'
import { DataExportResults } from '@webapp/components/Assessment/DataExport/utils/types'
import { forestPolicy, isForestPolicySection, isYearRange } from '@webapp/components/Assessment/DataExport/utils/checks'

const sections: Record<string, string> = {
  designatedManagementObjective: 'primary_designated_management_objective',
}

/**
 * Helper function to map to correct database columns
 * @param column - column value
 * @param section - url params: current section
 * @returns {*}
 */
export const formatColumn = (column: string, section: string): string => {
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
 * @param {string} variable - url params: current variable
 * @returns {{columnKey: string, value: string}} - formatted column and value, from results
 */
export const formatValue = (
  column: string,
  countryIso: string,
  results: DataExportResults,
  section: string,
  variable: string
): { columnKey: string; value: string } => {
  let columnKey = column

  if (isForestPolicySection(section)) columnKey = forestPolicy[column]
  if (isYearRange(column)) columnKey = column.replace('-', '_')

  let value = results?.[countryIso]?.[variable]?.[columnKey]
  // Convert value to string and check if it's a number
  if (!Number.isNaN(+value)) value = NumberUtils.formatNumber(value)
  if (value === 'NaN') value = ''

  return { columnKey, value }
}

export const convertValue = (value: string, base: Unit, unit: Unit): string =>
  base && base !== unit && Object.keys(UnitFactors).includes(base)
    ? UnitConverter.convertValue(value, base, unit)
    : value

/**
 * Helper function to handle datamase mapping for table names
 * @param assessmentSection
 * @param assessmentType
 * @returns {*}
 */
export const formatSection = (assessmentSection: string, assessmentType: AssessmentType): string => {
  if (assessmentType === AssessmentType.panEuropean) {
    return getPanEuropeanTableMapping(assessmentSection)
  }
  return sections[assessmentSection] ?? assessmentSection
}
