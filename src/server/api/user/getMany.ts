import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'
import { UserFilters } from 'meta/tablePaginated/users'
import { UserStatus } from 'meta/user'

import { UserController } from 'server/controller/user'
import Requests from 'server/utils/requests'

export const getMany = async (req: CycleRequest, res: Response): Promise<void> => {
  try {
    const { countryIso } = req.query

    const { assessment, cycle } = req.context

    const filters: UserFilters = { statuses: [UserStatus.active, UserStatus.invitationPending] }
    const users = await UserController.getMany({ assessment, cycle, countryIso, filters })

    Requests.sendOk(res, users)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
