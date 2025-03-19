import { Response } from 'express'

import { InitRequest } from 'meta/api/request'

import { AssessmentController } from 'server/controller/assessment'
import { SettingsController } from 'server/controller/settings'
import { AreaRedisRepository } from 'server/repository/redis/area'
import Requests from 'server/utils/requests'

export const getAreas = async (req: InitRequest, res: Response) => {
  try {
    const { assessmentName, cycleName } = req.query

    const settings = await SettingsController.read()
    const props = assessmentName ? { assessmentName } : { id: settings.defaultAssessmentId }
    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ ...props, cycleName })

    const [countries, regionGroups] = await Promise.all([
      AreaRedisRepository.getManyCountries({ assessment, cycle }),
      AreaRedisRepository.getManyRegionGroups({ assessment, cycle }),
    ])

    Requests.sendOk(res, { countries, regionGroups })
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
