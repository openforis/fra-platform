import { CountryIso } from 'meta/area'
import { AssessmentMetaCaches } from 'meta/assessment'
import { Assessment } from 'meta/assessment/assessment'
import { VariableCache } from 'meta/assessment/assessmentMetaCache'
import { Cycle } from 'meta/assessment/cycle'
import { TableNames } from 'meta/assessment/table'

import { isODPVariable } from 'server/controller/cycleData/getOriginalDataPointVariables'
import { BaseProtocol } from 'server/db'

import { isODPCell } from './isODPCell'

type Props = {
  assessment: Assessment
  colName: string
  countryIso: CountryIso
  cycle: Cycle
  isODP?: boolean
  tableName: string
  type: 'calculations' | 'validations'
  variableName: string
}

// Case 1 - ODP Edit: when editing an ODP,
// node dependents that are an ODP variable should not be updated and validated,
// all the others yes.

// Case 2 - Node Value (with correspondent ODP year) Edit:
// when editing a cell that has a correspondent ODP,
// dependencies that are ODP variables, should be updated,
// all the other variables should not.

export const getDependants = async (props: Props, client: BaseProtocol): Promise<VariableCache[]> => {
  const { isODP, type, ...rest } = props
  const dependants =
    type === 'calculations' ? AssessmentMetaCaches.getCalculationsDependants(rest) : AssessmentMetaCaches.getValidationsDependants(rest)

  // Case1
  if (isODP) {
    // Exclude all odp variables
    return dependants.filter((variable) => !isODPVariable(props.cycle, variable))
  }

  // Case2
  const _isODPCell = await isODPCell(props, client)
  if (!_isODPCell) return dependants
  return dependants.filter((dependant) =>
    [TableNames.extentOfForest, TableNames.forestCharacteristics].includes(dependant.tableName as TableNames)
  )
}
