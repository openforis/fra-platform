import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'

import Requests from 'server/utils/requests'

export const updateOriginalDataPointYear = async (
  req: CycleRequest<never, { id: string; year: string; targetYear: string }>,
  res: Response
) => {
  try {
    const { assessmentName, cycleName } = req.query
    const { id, targetYear, year } = req.body

    Requests.send(res, {
      assessmentName,
      cycleName,
      id,
      targetYear,
      year,
    })
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
