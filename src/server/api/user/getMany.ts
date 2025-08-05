import { Response } from 'express'

import { UsersRequest } from 'meta/api/request'
import { CountryIso } from 'meta/area'
import { TablePaginateds, UserFilters } from 'meta/tablePaginated'
import { UserStatus } from 'meta/user'

import { AssessmentController } from 'server/controller/assessment'
import { UserController } from 'server/controller/user'
import { ProcessEnv } from 'server/utils'
import Requests from 'server/utils/requests'

type Request = UsersRequest<{
  print: string
}>

export const getMany = async (req: Request, res: Response) => {
  try {
    const { assessmentName, countryIso, cycleName, filters: filtersReq, print } = req.query
    const filters = TablePaginateds.decodeFilters<UserFilters>(filtersReq)

    if (!filters.statuses) {
      filters.statuses = [UserStatus.active, UserStatus.invitationPending]
    }

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    let users = await UserController.getMany({ assessment, cycle, countryIso: countryIso as CountryIso, filters })

    if (print && print === 'true')
      users = users.filter((user) => !ProcessEnv.fraReportCollaboratorsExcluded.includes(user.email))

    Requests.sendOk(res, users)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
