import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request'

import { Requests } from 'server/utils'

export const getOriginalDataPointHistory = async (_req: CycleDataRequest, res: Response) => {
  try {
    // TODO: Add suport for non-empty last cycle odps
    const odpHistory = {
      // Example of the object:
      // countryIso: 'FIN',
      // year: '1990',
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
