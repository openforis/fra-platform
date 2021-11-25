import { Express, Request, Response } from 'express'
import { ApiEndPoint } from '@common/api/endpoint'
import { sendErr } from '@server/utils/requests'
import {
  AssessmentService,
  AssessmentCountryService,
  AssessmentRegionService,
  RegionGroupService,
} from '@server/service'

export const InitGet = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.Init.one(), async (req: Request, res: Response) => {
      const assessmentName = req.params.name ?? 'fra'
      try {
        const assessment = await AssessmentService.read({
          name: assessmentName,
        })

        const countries = await AssessmentCountryService.readAll({ assessment })
        const regions = await AssessmentRegionService.readAll({ assessment })
        const regionGroups = await RegionGroupService.readAll()

        res.send({
          assessment,
          countries,
          regionGroups,
          regions,
        })
      } catch (e) {
        sendErr(res, e)
      }
    })
  },
}
