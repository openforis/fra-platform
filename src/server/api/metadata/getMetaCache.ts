import { Response } from 'express'

import { CountryRequest } from 'meta/api/request/country'
import { AssessmentMetaCaches } from 'meta/assessment/metaCaches'

import Requests from 'server/utils/requests'

export const getMetaCache = async (req: CountryRequest, res: Response): Promise<void> => {
  const { assessment, cycle } = req.context

  try {
    const metaCache = AssessmentMetaCaches.getMetaCache({ assessment, cycle })

    Requests.send(res, metaCache)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
