import { Express, Request, Response } from 'express'
import { ApiEndPoint } from '@common/api/endpoint'
import { sendErr } from '@server/utils/requests'
import { AssessmentController, SettingsController } from '@server/controller'

export const InitGet = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.Init.one(), async (req: Request, res: Response) => {
      const assessmentName = req.params.name
      try {
        let assessment
        if (!assessmentName) {
          const settings = await SettingsController.read()

          assessment = await AssessmentController.read({
            id: settings.defaultAssessmentId,
          })
        } else {
          assessment = await AssessmentController.read({
            name: assessmentName,
          })
        }

        const countries = await AssessmentController.getCountries({ assessment })
        const regions = await AssessmentController.getRegions({ assessment })
        const regionGroups = await AssessmentController.getRegionGroups({ assessment })

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
