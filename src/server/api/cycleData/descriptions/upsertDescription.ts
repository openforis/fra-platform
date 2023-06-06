import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request'
import { CommentableDescriptionName, CommentableDescriptionValue } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

export const upsertDescription = async (
  req: CycleDataRequest<{ name: CommentableDescriptionName }, { value: CommentableDescriptionValue }>,
  res: Response
) => {
  try {
    const { assessmentName, sectionName, cycleName, countryIso, name } = req.query

    const { value } = req.body

    const { cycle, assessment } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const description = await CycleDataController.upsertDescription({
      countryIso,
      assessment,
      cycle,
      sectionName,
      name,
      value,
      user: Requests.getUser(req),
    })

    Requests.send(res, description)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
