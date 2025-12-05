import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request/cycleData/cycleData'
import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'

import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

type Request = CycleDataRequest<{ name?: CommentableDescriptionName }>

export const getDescription = async (req: Request, res: Response): Promise<void> => {
  try {
    const { assessment, cycle } = req.context
    const { countryIso, name, sectionName } = req.query

    const propsValues = { assessment, cycle, countryIso, sectionNames: [sectionName], name }
    const values = await CycleDataController.Description.getDescriptionValues(propsValues)

    Requests.send(res, values)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
