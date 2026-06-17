import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request/cycleData/cycleData'
import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'

import { DescriptionController } from 'server/controller/cycleData/description'
import Requests from 'server/utils/requests'

type Request = CycleDataRequest<{ name?: CommentableDescriptionName }>

export const getDescriptionsHistory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { assessment, cycle } = req.context
    const { countryIso, sectionName } = req.query

    const props = { assessment, cycle, countryIso, sectionName }
    const descriptions = await DescriptionController.getLastApproved(props)

    Requests.send(res, descriptions)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
