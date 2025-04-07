import { Response } from 'express'

import { InitRequest } from 'meta/api/request'

import { AreaController } from 'server/controller/area'
import { AssessmentController } from 'server/controller/assessment'
import Requests from 'server/utils/requests'

export const getAreas = async (req: InitRequest, res: Response) => {
  try {
    const { assessmentName, cycleName } = req.query

    let assessmentProps: { assessmentName: string }

    if (assessmentName) {
      assessmentProps = { assessmentName }
    } else {
      const assessments = await AssessmentController.getAll({})
      const defaultAssessment = assessments.find((a) => a.props.default)
      assessmentProps = { assessmentName: defaultAssessment.props.name }
    }

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({
      ...assessmentProps,
      cycleName,
    })

    const [countries, regionGroups] = await Promise.all([
      AreaController.getCountries({ assessment, cycle }),
      AreaController.getRegionGroups({ assessment, cycle }),
    ])

    Requests.sendOk(res, { countries, regionGroups })
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
