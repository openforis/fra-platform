import { Express, Request, Response } from 'express'
import { ApiEndPoint } from '@common/api/endpoint'
import { sendErr } from '@server/utils/requests'
import { AssessmentService } from '@server/service'

export const InitGet = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.Init.one(), async (req: Request, res: Response) => {
      const assessmentName = req.params.name ?? 'fra'
      try {
        const assessment = await AssessmentService.read({
          assessment: {
            props: {
              name: assessmentName,
            },
          },
        })

        // Note: Use Schemas.getName(assessment)

        const countries = {} // assessment_name here: assessment_fra CountryService.readAll({ assessment }) => assessement.props.name
        const regions = {} // assessment_name here: assessment_fra
        const regionGroups = {} // public.schema

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
