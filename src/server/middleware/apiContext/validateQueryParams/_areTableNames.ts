import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { TableNames } from 'meta/assessment/table'
import { Objects } from 'utils/objects'

import { TableRedisRepository } from 'server/cache/repository/table'
import { AssessmentController } from 'server/controller/assessment'

const customTableNames = Object.values(TableNames)
const _validTableNames: Record<AssessmentName, Record<CycleName, Array<string>>> = {}

const _getValidTableNames = async (params: Record<string, string | Array<string>>): Promise<Array<string>> => {
  const { assessmentName, cycleName } = params as { assessmentName?: AssessmentName; cycleName?: CycleName }
  if (!assessmentName || !cycleName) return customTableNames

  const cached = Objects.getInPath(_validTableNames, [assessmentName, cycleName])
  if (cached) return cached

  // cache if not found
  const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })
  const tablesRecord = await TableRedisRepository.getManyRecord({ assessment, cycle })
  const allValidNames = [...customTableNames, ...Object.keys(tablesRecord)]

  Objects.setInPath({ obj: _validTableNames, path: [assessmentName, cycleName], value: allValidNames })

  return allValidNames
}

/**
 * Returns full set of table names for given assessment and cycle
 * @param values
 * @param params
 */
export const _areTableNames = async (
  values: Array<string>,
  params: Record<string, string | Array<string>>
): Promise<boolean> => {
  const validTableNames = await _getValidTableNames(params)
  return values.every((value) => validTableNames.includes(value))
}
