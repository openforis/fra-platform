import { Numbers } from 'utils/numbers'

import { CountryIso } from 'meta/area'
import { AssessmentName, AssessmentNames, CycleName, TableCellNumberFormat, Unit } from 'meta/assessment'
import { RecordAssessmentDatas, RecordCountryData } from 'meta/data'
import { UnitConverter, UnitFactors } from 'meta/dataExport'

// import { getPanEuropeanTableMapping } from 'client/pages/DataExport/utils/panEuropean'

const sections: Record<string, string> = {
  designatedManagementObjective: 'primary_designated_management_objective',
}

/**
 * Helper function to display received data correctly
 * @param assessmentName
 * @param cycleName
 * @param {string} colName - column value
 * @param {string} countryIso - selection country iso
 * @param {Object} data - result set to display in the table
 * @param tableName
 * @param {string} variableName - url params: current variable
 * @returns {{columnKey: string, value: string}} - formatted column and value, from results
 */
type FormatValueProps = {
  assessmentName: AssessmentName
  colName: string
  countryIso: CountryIso
  cycleName: CycleName
  data: RecordCountryData
  tableName: string
  variableName: string
  format?: TableCellNumberFormat
}

type Returned = { columnKey: string; value: string }

export const formatValue = (props: FormatValueProps): Returned => {
  const {
    assessmentName,
    colName,
    countryIso,
    cycleName,
    data,
    format = TableCellNumberFormat.decimal,
    tableName,
    variableName,
  } = props
  const columnKey = colName

  let value = RecordAssessmentDatas.getDatum({
    assessmentName,
    cycleName,
    countryIso,
    data,
    tableName,
    colName,
    variableName,
  })
  // Convert value to string and check if it's a number
  if (value && !Number.isNaN(+value)) {
    const numericValue = Number(value)
    if (format === TableCellNumberFormat.year) {
      value = Numbers.toFixed(numericValue, 0)
    } else {
      let precision
      if (format === TableCellNumberFormat.integer) precision = 0
      value = Numbers.format(numericValue, precision)
    }
  }

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
 * @param assessmentName
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
