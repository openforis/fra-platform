import { Request, Response } from 'express'
import { AssessmentController } from '@server/controller'
import { Requests } from '@server/utils'

export const getOriginalDataPoint = async (req: Request, res: Response) => {
  try {
    const { name, cycleName, odpId } = req.params
    const odp = await AssessmentController.getOriginalDataPoint({ name, cycleName, odpId: Number(odpId) })
    Requests.send(res, odp)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
