import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request'
import { Link } from 'meta/cycleData'

import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

type Body = {
  link: Link
}

type Request = CycleDataRequest<never, Body>

export const updateLink = async (req: Request, res: Response): Promise<void> => {
  try {
    const { assessment, cycle } = req.context
    const { link } = req.body

    const user = Requests.getUser(req)

    const props = { assessment, cycle, link, user }
    const updatedLink = await CycleDataController.Links.update(props)

    Requests.send(res, updatedLink)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
