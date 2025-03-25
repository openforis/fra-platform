import { NextFunction, Response } from 'express'

import { CycleDataRequest } from 'meta/api/request'
import { AssessmentStatus } from 'meta/area'

import { AreaController } from 'server/controller/area'
import { AssessmentController } from 'server/controller/assessment'
import { DB } from 'server/db'
import { CountryRepository } from 'server/repository/assessmentCycle/country'
import Requests from 'server/utils/requests'

export const updateCountryStatus = async (req: CycleDataRequest, _res: Response, next: NextFunction) => {
  try {
    const { assessmentName, cycleName, countryIso } = req.query
    const user = Requests.getUser(req)

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    await DB.tx(async (client) => {
      const country = await CountryRepository.getOne({ assessment, cycle, countryIso }, client)

      if (country.props.status === AssessmentStatus.notStarted) {
        country.props.status = AssessmentStatus.editing
        await AreaController.updateCountry({ assessment, cycle, country, countryIso, user }, client)
      }
    })

    next()
  } catch (e) {
    next(e)
  }
}
