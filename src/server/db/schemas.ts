import { Assessment } from 'meta/assessment'
import { Cycle } from 'meta/assessment/cycle'

const getName = (assessment: Pick<Assessment, 'props'>): string => {
  return `assessment_${assessment.props.name}`.toLowerCase()
}

const getNameCycle = (assessment: Pick<Assessment, 'props'>, cycle: Pick<Cycle, 'name'>): string => {
  return `assessment_${assessment.props.name}_${cycle.name}`.toLowerCase()
}

const getSchemaGeo = () => `geo`

export const Schemas = {
  getName,
  getNameCycle,
  getSchemaGeo,
}
