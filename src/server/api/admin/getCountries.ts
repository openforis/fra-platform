import { Response } from 'express'

import { TablePaginatedRequest } from 'meta/api/request/tablePaginated'
import { CountryAdmin } from 'meta/area'
import { AssessmentStatus } from 'meta/area/country'

import Requests from 'server/utils/requests'

export const getCountries = async (_req: TablePaginatedRequest, res: Response) => {
  try {
    // const { assessmentName, cycleName, limit, page } = req.query

    const countries: Array<CountryAdmin> = [
      {
        countryIso: 'FIN',
        status: AssessmentStatus.editing,
        edited: '2023-06-09T16:00:36.613Z',
        invitationsAcceptedCount: 12,
        invitationsSentCount: 15,
        usersCount: 17,
      },
      {
        countryIso: 'AGO',
        status: AssessmentStatus.approval,
        edited: '2023-06-09T16:00:36.613Z',
        invitationsAcceptedCount: 4,
        invitationsSentCount: 4,
        usersCount: 5,
      },
    ]

    Requests.sendOk(res, countries)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
