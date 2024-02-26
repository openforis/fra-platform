import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request'
import { CommentableDescriptionName, CommentableDescriptionValue } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

type Request = CycleDataRequest<{ name: CommentableDescriptionName }, { value: CommentableDescriptionValue }>

export const upsertDescription = async (req: Request, res: Response) => {
  try {
    const { assessmentName, sectionName, cycleName, countryIso, name } = req.query
    const { value } = req.body
    const user = Requests.getUser(req)

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const propsUpsert = { assessment, cycle, countryIso, sectionName, name, value, user }
    const description = await CycleDataController.upsertDescription(propsUpsert)

    Requests.send(res, description)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
