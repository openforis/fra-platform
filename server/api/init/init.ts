import { Express, Request, Response } from 'express'
import { ApiEndPoint } from '@common/api/endpoint'
import { sendErr } from '@server/utils/requests'
import { AssessmentService, SettingsService } from '@server/service'

export const InitGet = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.Init.one(), async (req: Request, res: Response) => {
      const assessmentName = req.params.name
      try {
        let assessment
        if (!assessmentName) {
          const settings = await SettingsService.read()

          assessment = await AssessmentService.read({
            id: settings.defaultAssessmentId,
          })
        } else {
          assessment = await AssessmentService.read({
            name: assessmentName,
          })
        }

        const countries = await AssessmentService.getCountries({ assessment })
        const regions = await AssessmentService.getRegions({ assessment })
        const regionGroups = await AssessmentService.getRegionGroups()

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
