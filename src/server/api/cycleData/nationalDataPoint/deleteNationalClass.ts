import { Response } from 'express'

import { CountryRequest } from 'meta/api/request/country'

import { NationalDataPointController } from 'server/controller/cycleData/nationalDataPoint'
import Requests from 'server/utils/requests'

type Request = CountryRequest<never, { id: string; index: number }>

export const deleteNationalClass = async (req: Request, res: Response): Promise<void> => {
  try {
    const { index, odpId: id } = req.query
    const user = Requests.getUser(req)
    const { assessment, country, cycle } = req.context

    const propsDelete = { assessment, cycle, country, index, id, user }
    const returnedOriginalDataPoint = await NationalDataPointController.deleteNationalClass(propsDelete)

    Requests.send(res, returnedOriginalDataPoint)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
