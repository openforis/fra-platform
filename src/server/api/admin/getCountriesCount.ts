import { Response } from 'express'

import { TablePaginatedCountRequest } from 'meta/api/request/tablePaginated'

import Requests from 'server/utils/requests'

export const getCountriesCount = async (_req: TablePaginatedCountRequest, res: Response) => {
  try {
    // const { assessmentName, cycleName, limit, page } = req.query

    Requests.sendOk(res, { total: 2 })
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
