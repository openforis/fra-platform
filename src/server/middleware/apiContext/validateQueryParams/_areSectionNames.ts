import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { SectionNames } from 'meta/assessment/section'
import { Objects } from 'utils/objects'

import { SectionRedisRepository } from 'server/cache/repository/section'
import { AssessmentController } from 'server/controller/assessment'

const customSectionNames = Object.values(SectionNames)
const _validSectionNames: Record<AssessmentName, Record<CycleName, Array<string>>> = {}

const _getValidSectionNames = async (params: Record<string, string | Array<string>>): Promise<Array<string>> => {
  const { assessmentName, cycleName } = params as { assessmentName?: AssessmentName; cycleName?: CycleName }
  if (!assessmentName || !cycleName) return customSectionNames

  const cached = Objects.getInPath(_validSectionNames, [assessmentName, cycleName])
  if (cached) return cached

  // cache if not found
  const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })
  const validSectionNames = await SectionRedisRepository.getSectionNames({ assessment, cycle })
  const allValidNames = [...customSectionNames, ...validSectionNames]

  Objects.setInPath({ obj: _validSectionNames, path: [assessmentName, cycleName], value: allValidNames })

  return allValidNames
}

/**
 * Returns full set of section names for given assessment and cycle
 * @param values
 * @param params
 */
export const _areSectionNames = async (
  values: Array<string>,
  params: Record<string, string | Array<string>>
): Promise<boolean> => {
  const validSectionNames = await _getValidSectionNames(params)
  return values.every((value) => validSectionNames.includes(value))
}
