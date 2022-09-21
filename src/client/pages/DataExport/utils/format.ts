import { Numbers } from '@utils/numbers'

import { CountryIso } from '@meta/area'
import { AssessmentName, AssessmentNames } from '@meta/assessment'
import { TableData } from '@meta/data'
import { Unit, UnitConverter, UnitFactors } from '@meta/dataExport'

import { forestPolicy, isForestPolicySection } from '@client/pages/DataExport/utils/checks'
// import { getPanEuropeanTableMapping } from '@client/pages/DataExport/utils/panEuropean'

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
  countryIso: CountryIso,
  results: TableData,
  section: string,
  tableName: string,
  variable: string
): { columnKey: string; value: string } => {
  let columnKey = column

  if (isForestPolicySection(section)) columnKey = forestPolicy[column]

  let value = results?.[countryIso]?.[tableName]?.[columnKey]?.[variable]?.raw

  // Convert value to string and check if it's a number
  if (!Number.isNaN(+value)) value = Numbers.format(Number(value))
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
export const formatSection = (assessmentSection: string, assessmentName: AssessmentName): string => {
  if (assessmentName === AssessmentNames.panEuropean) {
    return AssessmentNames.panEuropean
    // TODO
    // return getPanEuropeanTableMapping(assessmentSection)
  }
  return sections[assessmentSection] ?? assessmentSection
}
