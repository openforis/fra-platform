import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request'
import { OriginalDataPoint } from 'meta/assessment'

import { Requests } from 'server/utils'

export const getOriginalDataPointHistory = async (req: CycleDataRequest, res: Response) => {
  try {
    const { year, countryIso } = req.query

    // TODO: Add suport for non-empty last cycle odps
    const odpHistory: Pick<OriginalDataPoint, 'countryIso' | 'year'> = {
      countryIso,
      year,
      // Example of the rest of the object:
      // dataSourceAdditionalComments: '',
      // dataSourceMethods: [],
      // dataSourceReferences: '',
      // description: '',
      // nationalClasses: [],
      // values: {},
    }

    Requests.send(res, odpHistory)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
