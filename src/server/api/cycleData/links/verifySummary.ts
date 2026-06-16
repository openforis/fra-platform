import { Response } from 'express'

import { CycleRequest } from 'meta/api/request/cycle'
import { AreaCode } from 'meta/area/areaCode'

import { LinksController } from 'server/controller/cycleData/links'
import Requests from 'server/utils/requests'

type Request = CycleRequest<{ countryIso?: AreaCode }>

export const verifySummary = async (req: Request, res: Response): Promise<void> => {
  try {
    const { assessment, country, cycle } = req.context
    const { countryIso } = country ?? {}

    const summary = await LinksController.getVerificationSummary({ assessment, countryIso, cycle })
    Requests.sendOk(res, summary)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
