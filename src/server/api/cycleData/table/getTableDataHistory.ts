import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request'
import { CountryIso } from 'meta/area'

import Requests from 'server/utils/requests'

type GetTableDataRequest = CycleDataRequest<{
  tableNames: Array<string>
  countryISOs: Array<CountryIso>
}>

export const getTableDataHistory = async (_req: GetTableDataRequest, res: Response) => {
  try {
    Requests.send(res, {})
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
