import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request'
import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'

import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

type Request = CycleDataRequest<{ name?: CommentableDescriptionName }>

export const getDescriptionsHistory = async (req: Request, res: Response) => {
  try {
    const { assessmentName, countryIso, cycleName, sectionName } = req.query
    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const props = { assessment, cycle, countryIso, sectionName }
    const descriptions = await CycleDataController.Description.getDescriptionsLastApproved(props)

    Requests.send(res, descriptions)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
