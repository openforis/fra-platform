import { Response } from 'express'

import { CycleRequest } from 'meta/api/request/cycle'
import { AreaCode } from 'meta/area/areaCode'

import { LinksController } from 'server/controller/cycleData/links'
import Requests from 'server/utils/requests'

type Request = CycleRequest<{ countryIso?: AreaCode }>

export const verifyStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { assessment, country, cycle } = req.context
    const { countryIso } = country ?? {}

    const activeJob = await LinksController.getActiveVerifyJob({ assessment, countryIso, cycle })
    const isVerificationInProgress = Boolean(activeJob)

    Requests.send(res, isVerificationInProgress)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
