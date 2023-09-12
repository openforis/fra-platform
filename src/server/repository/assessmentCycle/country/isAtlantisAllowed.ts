import { Assessment, Cycle } from 'meta/assessment'

import { ProcessEnv } from 'server/utils'

export const isAtlantisAllowed = (assessment: Assessment, cycle: Cycle) =>
  ProcessEnv.fraAtlantisAllowed.find(
    ({ assessmentName, cycleName }: { assessmentName: string; cycleName: string }) =>
      assessmentName === assessment.props.name && cycleName === cycle.name
  )
