import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request'

import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

type Body = {
  repositoryItem: string
}

export const createFile = async (req: CycleDataRequest<never, Body>, res: Response) => {
  try {
    const { assessmentName, cycleName, countryIso, sectionName } = req.query
    const repositoryItem = JSON.parse(req.body.repositoryItem)
    const { file } = req

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })
    const user = Requests.getUser(req)

    const props = { assessment, cycle, countryIso, file, repositoryItem, sectionName, user }
    const createdRepositoryEntity = await CycleDataController.Repository.create(props)

    Requests.send(res, createdRepositoryEntity)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
