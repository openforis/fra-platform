import { AssessmentName, AssessmentNames } from 'meta/assessment'
import { Unit } from 'meta/dataExport'

import { isYearWithWord } from './checks'

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
  growingStockMillionCubicMeter: 'millionCubicMeter',
  growingStockPercent: 'growingStockPercent',
  mostRecentYear: 'mostRecentYear',
  national_yes_no: 'national',
  scientific_name: 'scientificName',
  sub_national_yes_no: 'subnational',
}

export const getUnitLabelKey = (unit: string): string => (unitLabelKeys[unit] ? `unit.${unitLabelKeys[unit]}` : unit)

/**
 * Returns the possible i18n mapping
 * @param column - column value
 * @param section - url params: current section
 * @param assessmentName - type, ex. fra2020 / panEuropean
 * @returns {array} - i18n keys
 */
// TODO: Separate issue. Use column metadata to get column key (see Table.tsx).
// It requires updating the dataExport columns selection slice
export const getColumnLabelKeys = (column: string, section: string, assessmentName: AssessmentName): Array<string> => {
  if (assessmentName === AssessmentNames.panEuropean) {
    return [`${assessmentName}.${section}.${column}`]
  }

  if (isYearWithWord(column)) {
    const [year, word] = column.split('_')
    return [year, `${section}.${word}`]
  }

  return [columnLabelKeys[column] ? `${section}.${columnLabelKeys[column]}` : String(column)]
}
