import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'
import { AssessmentMetaCaches } from 'meta/assessment/metaCaches'

import Requests from 'server/utils/requests'

export const getMetaCache = async (req: CycleRequest, res: Response): Promise<void> => {
  const { assessment, cycle } = req.context

  try {
    const metaCache = AssessmentMetaCaches.getMetaCache({ assessment, cycle })

    Requests.send(res, metaCache)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
