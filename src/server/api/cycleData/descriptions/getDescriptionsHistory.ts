import { Response } from 'express'
import { Objects } from 'utils/objects'

import { CycleDataRequest } from 'meta/api/request'
import { CommentableDescriptionName } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

type Request = CycleDataRequest<{ name?: CommentableDescriptionName }>

export const getDescriptionsHistory = async (req: Request, res: Response) => {
  try {
    const { assessmentName, cycleName, countryIso } = req.query
    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })
    const info = await CycleDataController.History.LastApproved.getInfo({ assessment, cycle, countryIso })

    let descriptions = {}
    if (!Objects.isNil(info)) {
      const props = { assessment, cycle, countryIso, info }
      descriptions = await CycleDataController.Description.getDescriptionsLastApproved(props)
    }

    Requests.send(res, descriptions)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
