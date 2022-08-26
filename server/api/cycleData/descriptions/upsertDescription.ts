import { Response } from 'express'

import { CycleDataRequest } from '@meta/api/request'
import { CommentableDescriptionName } from '@meta/assessment/commentableDescription'

import { AssessmentController } from '@server/controller/assessment'
import { CycleDataController } from '@server/controller/cycleData'
import Requests from '@server/utils/requests'

export const upsertDescription = async (
  req: CycleDataRequest<{ name: CommentableDescriptionName }, { content: string }>,
  res: Response
) => {
  try {
    const { assessmentName, sectionName, cycleName, countryIso, name } = req.query

    const { content } = req.body

    const { cycle, assessment } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const description = await CycleDataController.upsertDescription({
      countryIso,
      assessment,
      cycle,
      sectionName,
      name,
      content,
      user: Requests.getRequestUser(req),
    })

    Requests.send(res, description)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
