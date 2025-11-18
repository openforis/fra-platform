import { Response } from 'express'

import { CountryRequest } from 'meta/api/request/country'

import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

type Request = CountryRequest<{ year: string }, { targetYear: string }>

export const copyOriginalDataPointNationalClasses = async (req: Request, res: Response): Promise<void> => {
  try {
    const { year } = req.query
    const { targetYear } = req.body
    const { assessment, country, cycle } = req.context
    const user = Requests.getUser(req)

    const copyNationalClassesProps = { assessment, cycle, country, year, targetYear, user }
    const returnedOriginalDataPoint = await CycleDataController.copyOriginalDataPointNationalClasses(
      copyNationalClassesProps
    )

    Requests.send(res, returnedOriginalDataPoint)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
