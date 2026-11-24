import { Request } from 'express'

import { Assessment, AssessmentName } from 'meta/assessment/assessment'
import { Cycle, CycleName } from 'meta/assessment/cycle'

import { AssessmentController } from 'server/controller/assessment'

type Props = {
  assessmentName: AssessmentName
  cycleName: CycleName
  req: Request
}

type Returned = {
  assessment: Assessment
  cycle: Cycle
}

export const _getAuthAssessmentCycle = async (props: Props): Promise<Returned> => {
  const { assessmentName, cycleName, req } = props
  const { assessment, cycle } = req.context

  const isContextCycle = assessmentName === assessment.props.name && cycleName === cycle.name
  if (isContextCycle) return { assessment, cycle }

  return AssessmentController.getOneWithCycle({ assessmentName, cycleName })
}
