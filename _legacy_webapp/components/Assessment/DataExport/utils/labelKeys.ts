import { Unit } from '../../../../sectionSpec'
import { AssessmentType } from '@core/assessment'
import { isYearWithWord } from '../../../../components/Assessment/DataExport/utils/checks'

const variableLabelKeys: Record<string, string> = {
  other: 'common.other',
  otherOrUnknown: 'common.unknown',
}

const unitLabelKeys: Record<string, string> = {
  ha: 'ha',
  kmSq: 'kmSq',
  mileSq: 'mileSq',
  acre1000: 'acre1000',
  acre: 'acre',
  haMillion: 'haMillion',
  [Unit.haThousand]: Unit.haThousand,
}

const columnLabelKeys: Record<string, string> = {
  common_name: 'commonName',
  scientific_name: 'scientificName',
  national: 'national',
  subnational: 'subnational',
}

/**
 * Some variable's might have custom mappings, check for the special cases and return accordingly
 * @param variable - i18n key of format 'foo.bar' to check for custom mapping(s)
 * @returns {*} - return either the original i18nKey or new key from variableI18nMappings
 */
export const getVariableLabelKey = (variable: string): string => {
  // get the last part of the i18n key,
  // ex: foo.bar.other => other
  const key = variable.split('.').pop()
  return variableLabelKeys[key] ? variableLabelKeys[key] : variable
}

export const getUnitLabelKey = (unit: string): string => (unitLabelKeys[unit] ? `unit.${unitLabelKeys[unit]}` : unit)

/**
 * Returns the possible i18n mapping
 * @param column - column value
 * @param section - url params: current section
 * @param assessmentType - type, ex. fra2020 / panEuropean
 * @returns {array} - i18n keys
 */
export const getColumnLabelKeys = (column: string, section: string, assessmentType: AssessmentType): Array<string> => {
  if (assessmentType === AssessmentType.panEuropean) {
    return [`${assessmentType}.${section}.${column}`]
  }

  if (isYearWithWord(column)) {
    const [year, word] = column.split('_')
    return [year, `${section}.${word}`]
  }

  return [columnLabelKeys[column] ? `${section}.${columnLabelKeys[column]}` : String(column)]
}
