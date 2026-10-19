import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request/cycleData/cycleData'
import { RepositoryItem } from 'meta/cycleData/repository/item'

import { RepositoryController } from 'server/controller/cycleData/repository'
import Requests from 'server/utils/requests'

type Body = {
  repositoryItem: RepositoryItem
}

type Request = CycleDataRequest<never, Body>

export const updateRepositoryItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { assessment, cycle } = req.context
    const { countryIso, sectionName } = req.query
    const { repositoryItem } = req.body

    const user = Requests.getUser(req)

    const props = { assessment, cycle, countryIso, repositoryItem, sectionName, user }
    const updatedRepositoryItem = await RepositoryController.update(props)

    Requests.send(res, updatedRepositoryItem)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
