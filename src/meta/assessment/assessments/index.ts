import { Dates } from 'utils/dates'

import { Assessment, AssessmentName, RecordAssessments } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { Cycles } from 'meta/assessment/cycles'

const getShortLabel = (assessmentName: AssessmentName) => `${assessmentName}.labels.short`

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

export const Assessments = {
  getShortLabel,
  getLastPublishedCycle,
  getLastCreatedCycle,
  getRecordAssessments,
}
