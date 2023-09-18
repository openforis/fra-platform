import { CountryIso } from 'meta/area'
import { AssessmentMetaCaches } from 'meta/assessment'
import { Assessment } from 'meta/assessment/assessment'
import { VariableCache } from 'meta/assessment/assessmentMetaCache'
import { Cycle } from 'meta/assessment/cycle'
import { TableNames } from 'meta/assessment/table'

import { isODPVariable } from 'server/controller/cycleData/getOriginalDataPointVariables'

export type DependantType = 'calculations' | 'validations'

type Props = {
  assessment: Assessment
  colName: string
  countryIso: CountryIso
  cycle: Cycle
  isODP?: boolean
  odpCell: boolean
  tableName: string
  type: DependantType
  variableName: string
}

// Case 1 - ODP Edit: when editing an ODP,
// node dependents that are an ODP variable should not be updated and validated,
// all the others yes.

// Case 2 - Node Value (with correspondent ODP year) Edit:
// when editing a cell that has a correspondent ODP,
// dependencies that are ODP variables, should be updated,
// all the other variables should not.

export const getDependants = (props: Props): Array<VariableCache> => {
  const { isODP, odpCell, type, ...rest } = props
  const dependants =
    type === 'calculations'
      ? AssessmentMetaCaches.getCalculationsDependants(rest)
      : AssessmentMetaCaches.getValidationsDependants(rest)

  // Case1 - update ODP: exclude all 1a/1b ODP variables
  if (isODP) {
    return dependants.filter((variable) => !isODPVariable(props.cycle, variable))
  }

  // Case2.1 - table cell doesn't have a correspondent ODP
  if (!odpCell) return dependants

  // Case2.2 - table cell has correspondent ODP -> returns only table 1a/1b variables
  return dependants.filter((dependant) =>
    [TableNames.extentOfForest, TableNames.forestCharacteristics].includes(dependant.tableName as TableNames)
  )
}
