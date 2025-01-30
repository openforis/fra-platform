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
    const { assessmentName, countryISOs, cycleName, tableNames } = req.query

    // Example:
    // {"fra":{"2020":{"FIN":{"specificForestCategories":{},"extentOfForest":{}}}}}
    const table: RecordAssessmentData = {
      [assessmentName]: {
        [cycleName]: {
          ...countryISOs.reduce(
            (acc, countryIso) => ({
              ...acc,
              [countryIso]: tableNames.reduce(
                (tableAcc, tableName) => ({
                  ...tableAcc,
                  [tableName]: {},
                }),
                {}
              ),
            }),
            {}
          ),
        },
      },
    }

    Requests.send(res, table)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
