import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request'
import { CommentableDescriptionName } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

export const getDescription = async (req: CycleDataRequest<{ name: CommentableDescriptionName }>, res: Response) => {
  try {
    const { assessmentName, sectionName, cycleName, countryIso, name } = req.query

    const { cycle, assessment } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })
    const description = await CycleDataController.getDescription({
      countryIso,
      assessment,
      cycle,
      sectionName,
      name,
    })

    Requests.send(res, description)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
