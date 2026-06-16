import { Response } from 'express'

import { CycleRequest } from 'meta/api/request/cycle'
import { AreaCode } from 'meta/area/areaCode'

import { LinksController } from 'server/controller/cycleData/links'
import Requests from 'server/utils/requests'
import { triggerVerifyLinksWorker } from 'server/worker/tasks/verifyLinks/triggerVerifyLinksWorker'

type Request = CycleRequest<{ countryIso?: AreaCode }>

export const verifyLinks = async (req: Request, res: Response): Promise<void> => {
  try {
    const { assessment, country, cycle } = req.context
    const { countryIso } = country ?? {}

    const user = Requests.getUser(req)

    // Enqueue the verify-links job.
    await LinksController.verify({ assessment, countryIso, cycle, user })
    // Ensure the worker dyno (or local worker) is running to consume the queue.
    await triggerVerifyLinksWorker()

    Requests.send(res)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
