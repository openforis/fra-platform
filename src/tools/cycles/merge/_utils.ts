import { PropsMerge } from 'tools/cycles/merge/_types'

import { Schemas } from 'server/db/schemas'

type MergeSchemas = {
  schemaCycleFrom: string
  schemaCycleTo: string
}

export const getSchemas = (props: PropsMerge): MergeSchemas => {
  const { assessment, cycleFrom, cycleTo } = props

  const { name: assessmentName } = assessment.props
  const { name: cycleNameFrom } = cycleFrom
  const { name: cycleNameTo } = cycleTo

  const schemaCycleFrom = Schemas.getSchemaAssessmentCycle({ assessmentName, cycleName: cycleNameFrom })
  const schemaCycleTo = Schemas.getSchemaAssessmentCycle({ assessmentName, cycleName: cycleNameTo })

  return { schemaCycleFrom, schemaCycleTo }
}
