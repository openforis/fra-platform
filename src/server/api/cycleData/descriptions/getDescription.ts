import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request'
import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'

import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

type Request = CycleDataRequest<{ name?: CommentableDescriptionName }>

export const getDescription = async (req: Request, res: Response) => {
  try {
    const { assessmentName, countryIso, cycleName, name, sectionName } = req.query

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const propsValues = { assessment, cycle, countryIso, sectionName, name }
    const values = await CycleDataController.Description.getDescriptionValues(propsValues)

    Requests.send(res, values)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
