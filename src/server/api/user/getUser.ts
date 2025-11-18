import { Response } from 'express'

import { CountryRequest } from 'meta/api/request/country'
import { Users } from 'meta/user'

import { UserController } from 'server/controller/user'
import Requests from 'server/utils/requests'

export const getUser = async (req: CountryRequest<{ id: string }>, res: Response): Promise<void> => {
  try {
    const { id } = req.query

    let cycleUuid = null
    const { assessment, cycle } = req.context
    if (assessment && cycle) {
      cycleUuid = cycle.uuid
    }

    const currentUser = Requests.getUser(req)
    const user = await UserController.getOne({
      id: Number(id),
      cycleUuid,
      allowDisabled: Users.isAdministrator(currentUser),
    })

    Requests.sendOk(res, user)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
