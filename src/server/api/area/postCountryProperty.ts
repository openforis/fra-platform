import { Response } from 'express'

import { CycleRequest } from '@meta/api/request'

import { AreaController } from '@server/controller/area'
import { AssessmentController } from '@server/controller/assessment'
import Requests from '@server/utils/requests'

export const postCountryProperty = async (req: CycleRequest<{ useOriginalDataPoint: string }>, res: Response) => {
  try {
    const { assessmentName, cycleName, countryIso, useOriginalDataPoint } = req.query

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const country = await AreaController.getCountry({ assessment, cycle, countryIso })

    const countryToUpdate = {
      ...country,
      props: { ...country.props, forestCharacteristics: { useOriginalDataPoint: useOriginalDataPoint === 'true' } },
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
