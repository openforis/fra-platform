import { Response } from 'express'

import { CountryRequest } from 'meta/api/request/country'

import { ExplorerController } from 'server/controller/explorer'
import Requests from 'server/utils/requests'

type Request = CountryRequest<{ sectionNames: Array<string> }>

export const getMetadata = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sectionNames } = req.query

    const { assessment, cycle } = req.context

    const explorerMetadata = await ExplorerController.getMetadata({ assessment, cycle, sectionNames })

    Requests.send(res, explorerMetadata)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
