import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request'
import { CountryIso } from 'meta/area'
import { RecordAssessmentData } from 'meta/data'

import Requests from 'server/utils/requests'

type GetTableDataRequest = CycleDataRequest<{
  tableNames: Array<string>
  countryISOs: Array<CountryIso>
}>

export const getTableDataHistory = async (req: GetTableDataRequest, res: Response) => {
  try {
    const { assessmentName, countryISOs, cycleName } = req.query

    // Example:
    // {"fra":{"2020":{"FIN":{}}}}
    const table: RecordAssessmentData = {
      [assessmentName]: {
        [cycleName]: {
          [countryISOs[0]]: {},
        },
      },
    }

    Requests.send(res, table)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
