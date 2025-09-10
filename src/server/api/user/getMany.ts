import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'
import { UserFilters } from 'meta/tablePaginated'
import { UserStatus } from 'meta/user'

import { UserController } from 'server/controller/user'
import { ProcessEnv } from 'server/utils'
import Requests from 'server/utils/requests'

export const getMany = async (req: CycleRequest<{ print: string }>, res: Response): Promise<void> => {
  try {
    const { countryIso, print } = req.query

    const { assessment, cycle } = req.context

    const filters: UserFilters = { statuses: [UserStatus.active, UserStatus.invitationPending] }
    let users = await UserController.getMany({ assessment, cycle, countryIso, filters })

    if (print && print === 'true')
      users = users.filter((user) => !ProcessEnv.fraReportCollaboratorsExcluded.includes(user.email))

    Requests.sendOk(res, users)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
