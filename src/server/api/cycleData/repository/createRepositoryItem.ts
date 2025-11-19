import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request/cycleData/cycleData'
import { RepositoryItem } from 'meta/cycleData/repository/item'

import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

type Body = {
  repositoryItem: RepositoryItem
}

export const createRepositoryItem = async (req: CycleDataRequest<never, Body>, res: Response): Promise<void> => {
  try {
    const { assessment, cycle } = req.context
    const { countryIso, sectionName } = req.query
    const { repositoryItem } = req.body

    const user = Requests.getUser(req)

    const props = { assessment, cycle, countryIso, repositoryItem, sectionName, user }
    const createdRepositoryEntity = await CycleDataController.Repository.create(props)

    Requests.send(res, createdRepositoryEntity)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
