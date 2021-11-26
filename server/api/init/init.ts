import { Express, Request, Response } from 'express'
import { ApiEndPoint } from '@common/api/endpoint'
import { sendErr } from '@server/utils/requests'
import { AssessmentController, SettingsController } from '@server/controller'

export const InitGet = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.Init.one(), async (req: Request, res: Response) => {
      const assessmentName = req.query.name as string
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

        const [countries, regions, regionGroups] = await Promise.all([
          AssessmentController.getCountries({ assessment }),
          AssessmentController.getRegions({ assessment }),
          AssessmentController.getRegionGroups({ assessment }),
        ])

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
