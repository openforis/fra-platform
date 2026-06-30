import { Assessment, AssessmentName, AssessmentNames, RecordAssessments } from 'meta/assessment/assessment'
import { Cycle, CycleName } from 'meta/assessment/cycle'
import { CycleNames } from 'meta/assessment/cycle/names'
import { Cycles } from 'meta/assessment/cycles'
import { UUID } from 'meta/uuid/uuid'
import { Dates } from 'utils/dates'

/**
 * Returns true if the given assessment has the ODP-feature layer
 * @param assessment - Assessment
 */
const hasODPFeature = (assessment: Assessment): boolean => assessment.props.name === AssessmentNames.fra

const getShortLabel = (assessmentName: AssessmentName): string => `${assessmentName}.labels.short`

/**
 * Retrieves the most recently published cycle from an assessment.
 *
 * @param {Assessment} assessment - Assessment
 * @returns {Cycle | undefined} The most recently published cycle, or undefined if no published cycles exist.
 */
const getLastPublishedCycle = (assessment: Assessment): Cycle | undefined => {
  const publishedCycles = assessment.cycles.filter((cycle) => Cycles.isPublished(cycle))

  if (publishedCycles.length === 0) {
    return undefined
  }

  return publishedCycles.reduce((last, current) => {
    const lastDate = new Date(last.props.datePublished)
    const currentDate = new Date(current.props.datePublished)
    return Dates.isAfter(currentDate, lastDate) ? current : last
  })
}

const getCycle = (props: { assessment: Assessment } & ({ cycleName: CycleName } | { cycleUuid: UUID })): Cycle => {
  const { assessment, ...rest } = props

  if ('cycleUuid' in props) return assessment.cycles[assessment.cycleIndexes.uuid[props.cycleUuid]]
  if ('cycleName' in props) return assessment.cycles[assessment.cycleIndexes.name[props.cycleName]]

  throw new Error(`Cycle not found ${assessment.props.name}-${JSON.stringify(rest)}`)
}

/**
 * Retrieves the most recently created cycle from an assessment.
 *
 * @param {Assessment} assessment - Assessment
 * @returns {Cycle | undefined} The most recently created cycle, or undefined if no cycles exist.
 */
const getLastCreatedCycle = (assessment: Assessment): Cycle | undefined => {
  return assessment.cycles.reduce((last, current) => {
    const lastDate = new Date(last.props.dateCreated)
    const currentDate = new Date(current.props.dateCreated)
    return Dates.isAfter(currentDate, lastDate) ? current : last
  })
}

const getRecordAssessments = (assessments: Array<Assessment>): RecordAssessments => {
  return assessments.reduce<RecordAssessments>((acc, assessment) => {
    acc[assessment.props.name] = assessment
    return acc
  }, {})
}

const getCycleTranslationKey = (props: { cycleName: CycleName }): string => {
  const { cycleName } = props

  if (cycleName.includes(CycleNames.latest)) {
    return 'common.latest'
  }

  return cycleName
}

export const Assessments = {
  getCycle,
  getCycleTranslationKey,
  getLastCreatedCycle,
  getLastPublishedCycle,
  getRecordAssessments,
  getShortLabel,
  hasODPFeature,
}
