import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request'
import { CommentableDescriptionName } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

type Request = CycleDataRequest<{ name?: CommentableDescriptionName }>

export const getDescription = async (req: Request, res: Response) => {
  try {
    const { assessmentName, sectionName, cycleName, countryIso, name } = req.query

    const { cycle, assessment } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const propsValues = { assessment, cycle, countryIso, sectionName, name }
    const values = await CycleDataController.getDescriptionValues(propsValues)

    Requests.send(res, values)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
