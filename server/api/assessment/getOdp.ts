import { Express, Request, Response } from 'express'
import { ApiEndPoint } from '@common/api/endpoint'
import { AssessmentController } from '@server/controller'
import { Requests } from '@server/utils'

export const AssessmentGetOdp = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.Assessment.OriginalDataPoint.one(), async (req: Request, res: Response) => {
      try {
        const { name, cycleName, odpId } = req.params
        const id = +odpId
        const odp = await AssessmentController.getOriginalDataPoint({ name, cycleName, odpId: id })
        Requests.send(res, odp)
      } catch (e) {
        Requests.sendErr(res, e)
      }
    })
  },
}
