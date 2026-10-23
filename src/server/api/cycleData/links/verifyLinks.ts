import { Response } from 'express'

import { CycleRequest } from 'meta/api/request/cycle'
import { AreaCode } from 'meta/area/areaCode'

import { LinksService } from 'server/service/links'
import Requests from 'server/utils/requests'

type Request = CycleRequest<{ countryIso?: AreaCode }>

export const verifyLinks = async (req: Request, res: Response): Promise<void> => {
  try {
    const { assessment, country, cycle } = req.context
    const { countryIso } = country ?? {}

    const user = Requests.getUser(req)

    await LinksService.enqueueAllLinksValidation({ assessment, countryIso, cycle, user })

    Requests.send(res)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
