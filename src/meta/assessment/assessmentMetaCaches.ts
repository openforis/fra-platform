import { Assessment } from './assessment'
import { Cycle } from './cycle'

const getCalculationsDependants = (props: {
  assessment: Assessment
  cycle: Cycle
  tableName: string
  variableName: string
}) => {
  const { assessment, cycle, tableName, variableName } = props
  return assessment.metaCache[cycle.uuid].calculations.dependants[tableName]?.[variableName] ?? []
}

export const AssessmentMetaCaches = {
  getCalculationsDependants,
}
