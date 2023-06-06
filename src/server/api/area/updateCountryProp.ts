import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'

import { AreaController } from 'server/controller/area'
import { AssessmentController } from 'server/controller/assessment'
import Requests from 'server/utils/requests'

export const updateCountryProp = async (
  req: CycleRequest<never, { [propName: string]: { useOriginalDataPoint: boolean } }>,
  res: Response
) => {
  try {
    const { assessmentName, cycleName, countryIso } = req.query

    const { countryProp } = req.body

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const country = await AreaController.getCountry({ assessment, cycle, countryIso })

    const countryToUpdate = {
      ...country,
      props: { ...country.props, ...countryProp },
    }

    const updatedCountry = await AreaController.updateCountry({
      countryIso,
      cycle,
      assessment,
      country: countryToUpdate,
      user: Requests.getUser(req),
    })

    Requests.send(res, updatedCountry)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
