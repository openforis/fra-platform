import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request'

import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

type QueryParams = {
  uuid: string
}

export const removeRepositoryItem = async (req: CycleDataRequest<QueryParams>, res: Response) => {
  try {
    const { assessmentName, cycleName, countryIso, sectionName, uuid } = req.query
    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })
    const user = Requests.getUser(req)

    const props = { assessment, cycle, countryIso, sectionName, user, uuid }
    await CycleDataController.Repository.remove(props)

    Requests.sendOk(res)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
