import { Request, Response } from 'express'

import Requests from 'server/utils/requests'

export const init = async (req: Request, res: Response) => {
  try {
    Requests.sendOk(res, {
      user: Requests.getUser(req),
    })
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
