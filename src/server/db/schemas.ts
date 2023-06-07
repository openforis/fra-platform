import { Assessment, Cycle } from 'meta/assessment'

const getName = (assessment: Pick<Assessment, 'props'>): string => {
  return `assessment_${assessment.props.name}`.toLowerCase()
}

const getNameCycle = (assessment: Pick<Assessment, 'props'>, cycle: Cycle): string => {
  return `assessment_${assessment.props.name}_${cycle.name}`.toLowerCase()
}

const getSchemaGeo = () => `geo`

export const Schemas = {
  getName,
  getNameCycle,
  getSchemaGeo,
}
