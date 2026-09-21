import { AssessmentName } from 'meta/assessment/assessment'
import { Objects } from 'utils/objects'

import { RowRedisRepository } from 'server/cache/repository/row'
import { AssessmentController } from 'server/controller/assessment'

const _validVariables: Record<AssessmentName, Array<string>> = {}

const _getValidVariables = async (params: Record<string, string | Array<string>>): Promise<Array<string>> => {
  const { assessmentName } = params as { assessmentName?: AssessmentName }
  if (!assessmentName) return []

  const cached = Objects.getInPath(_validVariables, [assessmentName])
  if (cached) return cached

  // cache if not found
  const assessment = await AssessmentController.getOne({ assessmentName })
  const rows = await RowRedisRepository.getRows({ assessment })
  const validVariables = [
    ...new Set(
      Object.values(rows)
        .map((row) => row.props.variableName)
        .filter(Boolean)
    ),
  ]

  Objects.setInPath({ obj: _validVariables, path: [assessmentName], value: validVariables })

  return validVariables
}

/**
 * Returns full set of variable names for given assessment
 * @param values
 * @param params
 */
export const _areVariables = async (
  values: Array<string>,
  params: Record<string, string | Array<string>>
): Promise<boolean> => {
  const validVariables = await _getValidVariables(params)
  return values.every((value) => validVariables.includes(value))
}
