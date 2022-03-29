import { Request, Response } from 'express'
import Requests from '@server/utils/requests'
import { AssessmentController } from '@server/controller/assessment'
import { SettingsController } from '@server/controller/settings'

export const init = async (req: Request, res: Response) => {
  const assessmentName = req.query.name as string
  try {
    let assessment
    let cycle
    if (!assessmentName) {
      const settings = await SettingsController.read()
      ;({ assessment, cycle } = await AssessmentController.getOneWithCycle({
        id: settings.defaultAssessmentId,
        cycleName: '2020', // TODO fix this
      }))
    } else {
      ;({ assessment, cycle } = await AssessmentController.getOneWithCycle({
        name: assessmentName,
        cycleName: '2020', // TODO fix this
      }))
    }

    const [countryISOs, regionGroups] = await Promise.all([
      AssessmentController.getCountryISOs({ assessment, cycle }),
      AssessmentController.getRegionGroups({ name: assessment.props.name }),
    ])

    res.send({
      assessment,
      countryISOs,
      regionGroups,
      user: Requests.getRequestUser(req),
    })
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
