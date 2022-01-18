import { Express, Request, Response } from 'express'
import { ApiEndPoint } from '@common/api/endpoint'
import { sendErr } from '@server/utils/requests'
import { AssessmentController } from '@server/controller'

export const AssessmentGetOdp = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.Assessment.OriginalDataPoint.one(), async (req: Request, res: Response) => {
      const { name, cycleName, odpId } = req.params
      try {
        const odp = await AssessmentController.getOdp({ name, cycleName, odpId })
        res.send(odp)
      } catch (e) {
        sendErr(res, e)
      }
    })
  },
}
