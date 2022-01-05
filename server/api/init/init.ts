import { Express, Request, Response } from 'express'
import { ApiEndPoint } from '@common/api/endpoint'
import { sendErr } from '@server/utils/requests'
import { AssessmentController, SettingsController } from '@server/controller'

import * as jwt from 'jsonwebtoken'
import { User } from '@meta/user'

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

        const [countryISOs, regionGroups] = await Promise.all([
          AssessmentController.getCountryISOs({ name: assessment.props.name }),
          AssessmentController.getRegionGroups({ name: assessment.props.name }),
        ])

        const { token } = req.cookies
        let user = undefined
        if (token) {
          const decodedJwt = jwt.decode(req.cookies?.token) as Record<string, User>
          user = decodedJwt.user
        }
      
        res.send({
          assessment,
          countryISOs,
          regionGroups,
          user,
        })
      } catch (e) {
        sendErr(res, e)
      }
    })
  },
}
