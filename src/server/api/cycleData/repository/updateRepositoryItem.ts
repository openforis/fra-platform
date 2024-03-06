import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request'
import { RepositoryItem } from 'meta/cycleData'

import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

type Body = {
  repositoryItem: RepositoryItem
}

type Request = CycleDataRequest<never, Body>

export const updateRepositoryItem = async (req: Request, res: Response) => {
  try {
    const { assessmentName, cycleName, countryIso, sectionName } = req.query
    const { repositoryItem } = req.body

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })
    const user = Requests.getUser(req)

    const props = { assessment, cycle, countryIso, repositoryItem, sectionName, user }
    const updatedRepositoryItem = await CycleDataController.Repository.update(props)

    Requests.send(res, updatedRepositoryItem)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
